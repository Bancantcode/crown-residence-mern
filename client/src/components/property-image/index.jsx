import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const Images = ({ propertyId }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Fetch image URLs from the database for the specific property ID
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/properties/${propertyId}`); // Ensure this is the correct endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Check if data.imagePaths is an array of URLs
        if (Array.isArray(data.imagePaths)) {
          setImageUrls(data.imagePaths); // Updated to use `imagePaths` as per the schema
        } else {
          console.error('Expected an array of image URLs but got:', data.imagePaths);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (propertyId) {
      fetchImages();
    }
  }, [propertyId]);

  return (
    <section className={styles.container}>
      {imageUrls.length > 0 ? (
        imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Property image ${index + 1}`} height={200} />
        ))
      ) : (
        <p>No images available.</p>
      )}
    </section>
  );
};

export default Images;
