import React, { useEffect, useState } from 'react';
import PropertyImage from '../components/property-image';
import PropertyDescription from '../components/property-description';
import PropertyDate from '../components/property-date';
import { useParams } from 'react-router-dom';

const ViewProperty = () => {
  const { id } = useParams(); // Get the property ID from URL parameters
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSelectedProperty = async () => {
      if (!id) {
        console.error('ID is undefined.');
        return; // Prevent fetching if ID is undefined
      }

      try {
        const response = await fetch(`http://localhost:5000/properties/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProperty(data); // Set the property data
      } catch (error) {
        console.error('Error fetching selected property:', error);
      } finally {
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
      <PropertyImage propertyId={property._id} />
      <PropertyDescription propertyId={property._id} /> {/* Pass propertyId instead */}
      <PropertyDate propertyId={property._id} fetchBookedDatesUrl={fetchBookedDatesUrl} />
    </main>
  );
};

export default ViewProperty;
