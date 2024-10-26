import React, { useEffect, useState } from 'react';
import styles from '../assets/styles/reservedProperty.module.scss';
import Header from '../components/header';
import Footer from '../components/footer';

const ReservedProperty = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propertyImages, setPropertyImages] = useState({}); // To store images of properties

  // Fetch reserved properties from the backend
  useEffect(() => {
    const userId = localStorage.getItem("userID"); // Retrieve user ID from local storage

    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bookings/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch reservations');

        const data = await response.json();
        console.log('Fetched Reservations:', data); // Log the data
        setReservations(data);

        // Fetch property images based on propertyId
        const imagePromises = data.map(async (reservation) => {
          const propertyResponse = await fetch(`http://localhost:5000/properties/${reservation.propertyId._id}`);
          const propertyData = await propertyResponse.json();
          return { id: reservation.propertyId._id, image: propertyData.imagePaths[0] }; // Assuming imagePaths is an array
        });

        // Wait for all image fetches to complete
        const images = await Promise.all(imagePromises);
        const imagesMap = images.reduce((acc, item) => {
          acc[item.id] = item.image; // Map property ID to image URL
          return acc;
        }, {});
        setPropertyImages(imagesMap); // Update state with property images

      } catch (error) {
        console.error('Failed to fetch reservations', error);
        setError(error.message); // Set the error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  return (
    <main>
      <Header />
      <div className={styles.container}>
        <div className={styles.about__container}>
          <h1 className={styles.title}>Your Reserved <span>---</span> Property</h1>
        </div>
        {error ? (
          <p className={styles.error}>{error}</p> // Display error message
        ) : reservations.length === 0 ? (
          <p>No reservations found.</p> // No reservations message
        ) : (
          <div className={styles.item_container}>
            {reservations.map((reservation) => (
              <div key={reservation._id} className={styles.booking_details}>
                <div className={styles.price}> 
                  <p> ${reservation.totalCost.toFixed(2)}</p>
                </div>
                <div>
                  {propertyImages[reservation.propertyId._id] && (
                    <img 
                    src={propertyImages[reservation.propertyId._id]} 
                    alt={`Image of ${reservation.propertyId.propertyName}`} 
                    className={styles.property_image} 
                    />
                  )}
                  <p className={styles.card_title}>{reservation.propertyId.propertyName}</p>
                </div>
                <div className={styles.content}>
                  <div className={styles.dates}>
                    <p className={styles.start}>{new Date(reservation.startDate).toLocaleDateString()}</p>
                    <p>{new Date(reservation.endDate).toLocaleDateString()}</p>
                  </div>
                  <a className={styles.button} href="">Pay Now<i className="ri-arrow-right-line"></i></a>             
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default ReservedProperty;
