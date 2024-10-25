import styles from './style.module.scss';
import Hero from '/images/Hero.webp';
import Image1 from '/images/3.webp';
import Image2 from '/images/7.webp';
import Image3 from '/images/15.webp';
import Image4 from '/images/16.webp';
import Image5 from '/images/24.webp';
import Image6 from '/images/30.webp';
import Image7 from '/images/32.webp';
import { useEffect, useState } from 'react';

const Landing = () => {
  const properties = [
    { image: Hero, name: "Explore", location: "Properties" },
    { image: Image1, name: "Paradise Escape", location: "San Fernando" },
    { image: Image2, name: "Villa Serene Heights", location: "Angeles City" },
    { image: Image3, name: "Paradise Height Villa", location: "San Fernando" },
    { image: Image4, name: "Golden Meadow Lodge", location: "Bamban Tarlac" },
    { image: Image5, name: "Aria Solstice Villa", location: "San Fernando" },
    { image: Image6, name: "Villa Hyacinth Heights", location: "San Fernando" },
    { image: Image7, name: "Villa Amante Heights", location: "San Fernando" },
  ];

  const [currentProperty, setCurrentProperty] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProperty((prevProperty) => (prevProperty + 1) % properties.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [properties.length]);

  return (
    <section className={styles.container}>
        <img src={properties[currentProperty].image} alt="hero image" />
        <div className={styles.absolute}>
            <div className={styles.hero__container}>
                <h2>Discover Timeless<br />Elegance in<br />Every Corner</h2>
                <div className={styles.property__container}>
                    <img src={properties[currentProperty].image} alt={properties[currentProperty].name} />
                    <div>
                        <p>{properties[currentProperty].location}</p>
                        <div className="flex">
                            <a href="/property">{properties[currentProperty].name}<i className="ri-arrow-right-line"></i></a>
                        </div>
                    </div>
                </div>
                <div className={styles.details}>
                    <p>Experience unparalleled luxury in the most coveted residences, where design meets sophistication and every detail reflects excellence.</p>
                    <a href="#about">Explore<i className="ri-arrow-right-line"></i></a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Landing
