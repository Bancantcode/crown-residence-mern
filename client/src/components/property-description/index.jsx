import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import Bedroom from '/images/bedrooms.webp';
import Bath from '/images/baths.webp';
import Beds from '/images/beds.webp';
import Guest from '/images/guests.webp';
import PropTypes from 'prop-types';

const Description = ({ propertyId }) => {
  const [propertyData, setPropertyData] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!propertyId) {
        console.error('Property ID is undefined.');
        return;
      }

      console.log('Fetching property details for ID:', propertyId);

      try {
        const response = await fetch(`http://localhost:5000/properties/${propertyId}`);
        if (!response.ok) {
          throw new Error(`Error fetching property: ${response.statusText}`);
        }
        const data = await response.json();
        setPropertyData(data);
      } 
      catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (!propertyData) {
    return <p>Loading property details...</p>;
  }

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <span className={styles.location}>{`${propertyData.location.city}, ${propertyData.location.province}, ${propertyData.location.country}`}</span>
        <h2 className={styles.property__name}>{propertyData.propertyName}</h2>
        <div className={styles.flex}>
          <p><img src={Bedroom} alt="bedroom" height="25" /> {propertyData.features.bedrooms} bedrooms</p>
          <p><img src={Bath} alt="bath" height="25" /> {propertyData.features.baths} baths</p>
          <p><img src={Beds} alt="beds" height="25" /> {propertyData.features.beds} beds</p>
          <p><img src={Guest} alt="guests" height="25" /> {propertyData.features.guests} guests</p>
        </div>
        <h5 className={styles.hosted__by}>Hosted by {propertyData.host} <i className="ri-arrow-right-up-line"></i></h5>
        <div className={styles.description}>
          <p>{propertyData.description.overview}</p>
          <br />
          <p>{propertyData.description.detailed}</p>
        </div>
        <div className={styles.feedback}>
          {propertyData.reviews.map((review, index) => (
            <div key={index} className={styles.review}>
              <div>
                <p className={styles.content}>{review.content}</p>
                <hr />
                <p className={styles.name}>{review.reviewerName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


Description.propTypes = {
  propertyId: PropTypes.string.isRequired,
};

export default Description;
