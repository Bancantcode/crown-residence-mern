import styles from './style.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h4>Timeless Elegance in Every Corner</h4>
      <div>
        <p>+639282977154</p>
        <p>crownresidence@hau.dev</p>
        <p>#1 Holy Angel St, Angeles, 2009 Pampanga</p>
      </div>
      <div>
        <p>&copy;2024 WD-303</p>
        <p>All rights reserved.</p>
      </div>
      <div>
        <a href="#"><i className="ri-arrow-up-line"></i></a>
      </div>
    </footer>
  )
}

export default Footer