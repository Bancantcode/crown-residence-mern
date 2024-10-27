import { useEffect, useState } from 'react';
import styles from '../assets/styles/reservedProperty.module.scss';
import Header from '../components/header';
import Footer from '../components/footer';

const ReservedProperty = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propertyImages, setPropertyImages] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userID");

    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bookings/${userId}`);
        if (!response.ok) throw new Error('Please sign up first');

        const data = await response.json();
        setReservations(data);

        const imagePromises = data.map(async (reservation) => {
          const propertyResponse = await fetch(`http://localhost:5000/properties/${reservation.propertyId._id}`);
          const propertyData = await propertyResponse.json();
          return { id: reservation.propertyId._id, image: propertyData.imagePaths[0] };
        });

        const images = await Promise.all(imagePromises);
        const imagesMap = images.reduce((acc, item) => {
          acc[item.id] = item.image;
          return acc;
        }, {});
        setPropertyImages(imagesMap);

      } 
      catch (error) {
        console.error('Failed to fetch reservations', error);
        setError(error.message);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);
  
  // Handle remove property
  const handleRemoveProperty = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to remove the booking.');

      // Update state to remove the deleted booking
      setReservations((prevReservations) => prevReservations.filter(reservation => reservation._id !== bookingId));
    } 
    catch (error) {
      console.error('Error removing booking:', error);
      alert(error.message);
    }
  };

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  const showAlert = () => {
    alert("Payment method is not implemented yet.");
  };

  return (
    <main>
      <Header />
      <div className={styles.container}>
        <div className={styles.about__container}>
          <h1 className={styles.title}>Your Reserved <span>---</span> Property</h1>
        </div>
        {error ? (
          <p className={styles.error}>{error}</p>
          ) : reservations.length === 0 ? (
            <p>No reservations found.</p>
          ) : (
          <div className={styles.item_container}>
            {reservations.map((reservation) => (
              <div key={reservation._id} className={styles.booking_details}>
                <div className={styles.price}> 
                  <p> ${reservation.totalCost.toFixed(2)}</p>
                </div>
                <div>
                  {propertyImages[reservation.propertyId._id] && (
                    <img src={propertyImages[reservation.propertyId._id]} alt={`Image of ${reservation.propertyId.propertyName}`} className={styles.property_image} />
                  )}
                  <p className={styles.card_title}>{reservation.propertyId.propertyName}</p>
                </div>
                <div className={styles.content}>
                  <div className={styles.dates}>
                    <p className={styles.start}>{new Date(reservation.startDate).toLocaleDateString()}</p>
                    <p>{new Date(reservation.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className={styles.button__click}>
                    <a className={styles.button} onClick={showAlert}>Pay Now<i className="ri-arrow-right-up-line"></i></a>             
                    <a className={styles.button} onClick={() => handleRemoveProperty(reservation._id)}>Remove Property<i className="ri-arrow-right-up-line"></i></a>                  </div>
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
