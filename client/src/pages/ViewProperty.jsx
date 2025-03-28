import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyImage from '../components/property-image';
import PropertyDescription from '../components/property-description';
import PropertyDate from '../components/property-date';
import Footer from '../components/footer';
import Header from '../components/header';
import styles from '../assets/styles/viewproperty.module.scss';

const ViewProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSelectedProperty = async () => {
      if (!id) {
        console.error('ID is undefined.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/properties/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProperty(data);
      } 
      catch (error) {
        console.error('Error fetching selected property:', error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchSelectedProperty();
  }, [id]);

  if (loading) {
    return <p>Loading property...</p>;
  }

  if (!property) {
    return <p>No property found.</p>;
  }

  const fetchBookedDatesUrl = `http://localhost:5000/bookings/property/${property._id}/dates`;

  return (
    <main>
      <Header />
      <PropertyImage propertyId={property._id} />
      <div className={styles.flex}>
        <PropertyDescription propertyId={property._id} />
        <PropertyDate propertyId={property._id} fetchBookedDatesUrl={fetchBookedDatesUrl} />
      </div>
      <Footer />
    </main>
  );
};

export default ViewProperty;
