import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure this is imported
import styles from '../assets/styles/property.module.scss';
import Header from '../components/header';

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties from the backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/properties'); // Your API endpoint
        const data = await response.json();
        setProperties(data);  // Store properties in state
        setLoading(false);    // Set loading to false
      } catch (error) {
        console.error('Failed to fetch properties', error);
        setLoading(false);    // Set loading to false
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p>Loading properties...</p>;
  }

  return (
    <main>
      <Header />
      <div className={styles.container}>
        <div className={styles.item_container}>
          {properties.map((property) => (
            <Link to={`/properties/${property._id}`} key={property._id} className={styles.item}>
              <img src={property.imagePaths[0]} alt={property.propertyName} />
              <section className={styles.info}>
                <div className={styles.title}>
                  <h3>{property.propertyName}</h3>
                  <p>{`${property.location.city}, ${property.location.province}, ${property.location.country}`}</p>
                </div>
                <p className={styles.rate}>
                  <span>{property.pricePerNight}</span>/ nights
                </p>
                <p className={styles.rent}>Whole Home</p>
                <p className={styles.desc}>{property.description.overview}</p>
              </section>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Property;
