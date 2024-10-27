import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/property.module.scss';
import Header from '../components/header';
import Footer from '../components/footer'

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSortChange = (e) => { setSelectedSort(e.target.value); };

  const filteredProperties = properties
    .filter((property) => {
      const isSearchMatch = property.propertyName.toLowerCase().includes(searchQuery.toLowerCase());
      return isSearchMatch;
    })
    .sort((a, b) => {
      if (selectedSort === 'high-to-low') {
        return b.pricePerNight - a.pricePerNight;
      }
      if (selectedSort === 'low-to-high') {
        return a.pricePerNight - b.pricePerNight;
      }
      return 0;
    });

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
          <h1 className={styles.title}>Crown Residence <span>---</span> Property</h1>
        </div>

        <div className={styles.interfaces}>
            <input type="text" className={styles.search__input} placeholder="SEARCH" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div className={styles.dropdown__container}>
                <select id="sort" className={styles.dropdown} value={selectedSort} onChange={handleSortChange}>
                    <option value="">Sort by</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                </select>
            </div>
        </div>

        <div className={styles.item_container}>
          {filteredProperties.map((property) => (
            <div key={property._id} className={styles.item}>
              <div>
              <img src={property.imagePaths[0]} alt={property.propertyName} />
                <h3>{property.propertyName}</h3>
              </div>
                <div className={styles.content}>
                  <p className={styles.rate}>
                    <span>${property.pricePerNight}</span>/night
                  </p>
                  <Link to={`/properties/${property._id}`} className={styles.button}>View Property</Link>
                </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Property;
