import styles from './style.module.scss'
import Names from './names/index'

export default function Home() {

  const names = [
    { title1: "Cayoh Allou", title2: "Anicete", src: "Anicete.webp" },
    { title1: "Renell", title2: "Constantino", src: "Anicete.webp" },
    { title1: "Bryan Aaron", title2: "Santiago", src: "Anicete.webp" },
    { title1: "Karl", title2: "Vladimir Borja", src: "Anicete.webp" },
    { title1: "Frances Luis", title2: "Tumampos", src: "tumampos.jpg" }
  ]

  return (
    <main className={styles.main}>
      <div className={styles.gallery}>
        <p className={styles.category}>[Meet the Team]</p>
        {
            names.map((name, index) => {
                return <Names key={index} names={name}/>
            })
        }
      </div>
    </main>
  )
}