import styles from './styles.module.scss';
import Image1 from '/images/1.webp'

const Images = () => {
  return (
    <section className={styles.container}>
        <img src={Image1} alt="" height={200}/>
        <img src={Image1} alt="" height={200}/>
        <img src={Image1} alt="" height={200}/>
        <img src={Image1} alt="" height={200}/>
        <img src={Image1} alt="" height={200}/>
    </section>
  )
}

export default Images