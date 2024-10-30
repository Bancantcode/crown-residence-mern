import styles from './style.module.scss';
import Image1 from '/images/about-main-image.webp';
import Image2 from '/images/33.webp';
import Image3 from '/images/31.webp';
import Image4 from '/images/26.webp';
import Image5 from '/images/21.webp';

const Index = () => {
  return (
    <section className={styles.container}>
        <div className={styles.about__container}>
            <span className={styles.category}>[BLOG]</span>
            <h1 className={styles.title}><span>At Crown Residence</span>, we blend unparalleled expertise with visionary design to elevate the lifestyle of our distinguished clientele.</h1>
        </div>
        <div className={styles.about__flex}>
            <div className={styles.about__content}>
                <p>At Crown Residence, we seamlessly merge decades of industry expertise with a forward-thinking approach to design and development. Our team is dedicated to curating luxurious spaces that embody both aesthetic excellence and functional sophistication. Every project we undertake is a reflection of our commitment to delivering exceptional results tailored to the unique needs of our clients.</p>
                <br />
                <p>We believe that true luxury lies in the details, and that’s why we go beyond standard expectations to create residences that inspire and elevate. From personalized design concepts to strategic commercial insights, our goal is to craft spaces that not only captivate but also enrich the lifestyles of those who experience them. At Crown Residence, your vision is our blueprint.</p>
                <a href="/blog">View Blog<i className="ri-arrow-right-line"></i></a>
            </div>
            <div className={styles.about__image}>
                <img className={styles.main__image} src={Image1} alt="main image" />
                <div className={styles.four__image}>
                    <div><img src={Image2} alt="image1" /></div>
                    <div><img src={Image3} alt="image2" /></div>
                    <div><img src={Image4} alt="image3" /></div>
                    <div><img src={Image5} alt="image4" /></div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Index