import styles from './style.module.scss'
import Showcase1 from '/images/showcase1.webp';
import Showcase2 from '/images/showcase2.webp';
import Showcase3 from '/images/showcase3.webp';
import Showcase4 from '/images/showcase4.webp';

const Index = () => {

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Envisioning a Decade <br />of Transformation <br />and Innovation</h2>
            <div className={styles.grid}>
                <img src={Showcase1} alt="showcase 1" />
                <img src={Showcase2} alt="showcase 2" />
                <img src={Showcase3} alt="showcase 3" />
                <img src={Showcase4} alt="showcase 4" />
            </div>
        </section>
    )
}

export default Index