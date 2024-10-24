import styles from './style.module.scss'
import Bedroom from '/images/bedrooms.webp'
import Bath from '/images/baths.webp'
import Beds from '/images/beds.webp'
import Guest from '/images/guests.webp'

const Description = () => {
  return (
    <section className={styles.container}>
        <div className={styles.content}>
            <span className={styles.location}>SAN FERNANDO, PAMPANGA, PHILIPPINES</span>
            <h2 className={styles.property__name}>Paradise Escape</h2>
            <div className={styles.flex}>
                <p><img src={Bedroom} alt="bedroom" height="30"/>6 bedrooms</p>
                <p><img src={Bath} alt="bath" height="30"/>6 baths</p>
                <p><img src={Beds} alt="beds" height="30"/>6 beds</p>
                <p><img src={Guest} alt="guests" height="30"/>12 guests</p>
            </div>
            <h2 className={styles.hosted__by}>Hosted by Vladimir Borja<i className="ri-arrow-right-up-line"></i></h2>
            <div className={styles.description}>
                <p>Your ideal retreat immersed in nature. This luxurious villa serves as a tranquil oasis, offering breathtaking views of lush landscapes and serene waters. With elegance and comfort at the forefront of its design, Paradise Escape features expansive living areas, a fully equipped gourmet kitchen, and beautifully styled bedrooms that create the perfect atmosphere for relaxation.</p>
                <br />
                <p>Step outside to discover your private infinity pool, where you can bask in the sun or unwind in the shaded lounge areas. With modern amenities and an exquisite setting, Paradise Escape is the perfect destination for families, couples, or anyone looking for a rejuvenating getaway.</p>
            </div>
            <div className={styles.feedback}>
                <div className={styles.review}>
                    <p>&apos;Paradise Escape represents the essence of serenity! From the moment we arrived, we were enveloped in a sense of relaxation. The views are absolutely stunning, and the villa&apos;s design is both opulent and welcoming. We spent our days lounging by the ...</p>
                    <p className={styles.name}>Bryan Aaron Santiago</p>
                </div>
                <div className={styles.review}>
                    <p>&apos;Paradise Escape represents the essence of serenity! From the moment we arrived, we were enveloped in a sense of relaxation. The views are absolutely stunning, and the villa&apos;s design is both opulent and welcoming. We spent our days lounging by the ...</p>
                    <p className={styles.name}>Bryan Aaron Santiago</p>
                </div>
            </div>
        </div>
        <div className={styles.date}>
            
        </div>
    </section>
  )
}

export default Description