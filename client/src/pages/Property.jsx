import style from '../assets/styles/property.module.scss';
import React from 'react';
import Header from '../components/header';
import image1 from '/images/1.webp';
import image2 from '/images/6.webp';
import image3 from '/images/11.webp';
import image4 from '/images/16.webp';


const Property = () => {
  return (
    <main>
      <Header />
      {/* create a template */}
      <div className={style.container}>
        <div className={style.item_container}>
          <div className={style.item}>
            <img src={image1} alt="" />
            <section className={style.info}>
              <div className={style.title}>
                <h3>Paradise Escape</h3>
                <p>San Fernando, Pampanga, Philippines</p>
              </div>
              <p className={style.rate}><span>$100</span>/ nights</p>
              <p className={style.rent}>Whole Home</p>
              <p className={style.desc}>Nestled amidst lush greenery, Villa Serene Heights offers a perfect blend of luxury and tranquility. This modern Mediterranean-inspired home features expansive ... </p>
            </section>
          </div>
          <div className={style.item}>
            <img src={image2} alt="" />
            <section className={style.info}>
              <div className={style.title}>
                <h3>Villa Serene Heights</h3>
                <p>Angeles City, Pampanga, Philippines</p>
              </div>
              <p className={style.rate}><span>$100</span>/ nights</p>
              <p className={style.rent}>Whole Home</p>
              <p className={style.desc}>Nestled amidst lush greenery, Villa Serene Heights offers a perfect blend of luxury and tranquility. This modern Mediterranean-inspired home features expansive/Nestled amidst lush greenery, Villa Serene Heights offers a perfect blend of luxury and tranquility. This modern Mediterranean-inspired home features expansive/Nestled amidst lush greenery, Villa Serene Heights offers a perfect blend of luxury and tranquility. This modern Mediterranean-inspired home features expansive </p>
            </section>
          </div>
          <div className={style.item}>
            <img src={image3} alt="" />
            <section className={style.info}>
              <div className={style.title}>
                <h3>Paradise Height Villa</h3>
                <p>San Fernando, Pampanga, Philippines</p>
              </div>
              <p className={style.rate}><span>$100</span>/ nights</p>
              <p className={style.rent}>Whole Home</p>
              <p className={style.desc}>Nestled amidst lush greenery, Villa Serene Heights offers a perfect blend of luxury and tranquility. This modern Mediterranean-inspired home features expansive/Nestled amidst lush greenery, Villa Serene Heights offers a perfect blend of luxury and tranquility. This modern Mediterranean-inspired home features expansive/Nestled amidst lush greenery, Villa Serene Heights offers a perfect blend of luxury and tranquility. This modern Mediterranean-inspired home features expansive </p>
            </section>
          </div>
          <div className={style.item}>
            <img src={image4} alt="" />
            <section className={style.info}>
              <div className={style.title}>
                <h3>Golden Meadow Lodge</h3>
                <p>Angeles City, Pampanga, Philippines</p>
              </div>
              <p className={style.rate}><span>$100</span>/ nights</p>
              <p className={style.rent}>Whole Home</p>
              <p className={style.desc}>Nestled amidst lush greenery, Villa Serene Heights offers a perfect blend of luxury and tranquility. This modern Mediterranean-inspired home features expansive/Nestled amidst lush greenery, Villa Serene Heights offers a perfect blend of luxury and tranquility. This modern Mediterranean-inspired home features expansive/Nestled amidst lush greenery, Villa Serene Heights offers a perfect blend of luxury and tranquility. This modern Mediterranean-inspired home features expansive </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Property