import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/property.module.scss';
import Header from '../components/header';
import Footer from '../components/footer'

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/properties');
        const data = await response.json();
        setProperties(data);
        setLoading(false);
      } 
      catch (error) {
        console.error('Failed to fetch properties', error);
        setLoading(false); 
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
        <div className={styles.about__container}>
          <h1 className={styles.title}>Crown <span>---</span> Property</h1>
        </div>
        <div className={styles.item_container}>
          {properties.map((property) => (
            <Link to={`/properties/${property._id}`} key={property._id} className={styles.item}>
              <div>
              <img src={property.imagePaths[0]} alt={property.propertyName} />
                <h3>{property.propertyName}</h3>
              </div>
                <div className={styles.content}>
                  <p className={styles.rate}>
                    <span>${property.pricePerNight}</span>/night
                  </p>
                  <a className={styles.button} href="">View Property</a>
                </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Property;
