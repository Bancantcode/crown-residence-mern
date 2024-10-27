import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';

const Images = ({ propertyId }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/properties/${propertyId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (Array.isArray(data.imagePaths)) {
          setImageUrls(data.imagePaths);
        } 
        else {
          console.error('Expected an array of image URLs but got:', data.imagePaths);
        }
      } 
      catch (error) {
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
          <img key={index} src={url} alt={`Property image ${index + 1}`} />
        ))) : ( <p>No images available.</p> )}
    </section>
  );
};

Images.propTypes = {
  propertyId: PropTypes.string.isRequired,
};

export default Images;
