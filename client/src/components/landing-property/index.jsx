import styles from './style.module.scss';
import Image1 from '/images/29.webp';
import Image2 from '/images/10.webp';
import Image3 from '/images/32.webp';

const Property = () => {
    const content = [
        { 
            image: Image1, 
            title: "Villa Hyacinth Heights", 
            description: "The open-plan living area is perfect for entertaining, with ample room to gather and unwind. Step outside to discover your private outdoor oasis, complete with a sparkling pool and a cozy sitting area filled with comfortable camping chairs—ideal for soaking up the sun or enjoying evening conversations under the stars. ",
            link: "http://localhost:5173/properties/671b378f2d7b9e52221fe171"
        },
        { 
            image: Image2, 
            title: "Villa Serene Heights", 
            description: "Nestled amidst lush greenery, Villa Serene Heights offers a perfect blend of luxury and tranquility. This modern Mediterranean-inspired home features expansive windows that allow natural light to flood the spacious interiors, creating a warm and welcoming ambiance. ", 
            link: "http://localhost:5173/properties/671ad18be5dc1f9892cb79de"
        },
        { 
            image2: Image3, 
            title2: "Villa Amante Heights", 
            description2: "Discover the charm of our one-of-a-kind two-storey home, nestled in a spacious grassy area that offers both privacy and tranquility. This architectural gem features a striking gray modern interior with over sized windows that beautifully showcase the inviting spaces within.",
            link: "http://localhost:5173/properties/671b37902d7b9e52221fe174"
        },
    ]

    return (
        <section className={styles.container}>
            <div className={styles.about__container}>
                <span className={styles.category}>[FEATURED PROPERTY]</span>
                <h1 className={styles.title}>Where Elegance Meets <span>---</span> Innovation</h1>
            </div>
            <div className={styles.flex}>
            {content.slice(0, 2).map((c, index) => (
                <div className={styles.column} key={index}>
                    <img src={c.image} alt={`Image ${index + 1}`} />
                    <div>
                        <div className={styles.content__title}>{c.title}</div>
                        <p>{c.description}</p>
                        <a href={c.link}>View Property<i className="ri-arrow-right-line"></i></a>
                    </div>
                </div>
            ))}
            </div>
            
            <div className={styles.flex2}>
                <div className={styles.column}>
                    <img src={content[2].image2} alt="Image 3" />
                    <div>
                        <div className={styles.content__title}>{content[2].title2}</div>
                        <p>{content[2].description2}</p>
                        <a href={content[2].link}>View Property<i className="ri-arrow-right-line"></i></a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Property
