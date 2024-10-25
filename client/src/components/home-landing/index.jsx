import styles from './style.module.scss';
import Hero from '/images/Hero.webp';
import Image1 from '/images/1.webp';

const Landing = () => {
  return (
    <section className={styles.container}>
        <img src={Hero} alt="hero image" />
        <div className={styles.absolute}>
            <div className={styles.hero__container}>
                <h2>Discover Timeless<br />Elegance in<br />Every Corner</h2>
                <div className={styles.property__container}>
                    <img src={Image1} alt="Image1" />
                    <div>
                        <p>San Fernando</p>
                        <a href="/">Paradise Escape<i className="ri-arrow-right-line"></i></a>
                    </div>
                </div>
                <div className={styles.details}>
                    <p>Experience unparalleled luxury in the most coveted residences, where design meets sophistication and every detail reflects excellence.</p>
                    <a href="/about">Explore<i className="ri-arrow-right-line"></i></a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Landing