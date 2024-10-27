import Header from '../components/header'
import styles from '../assets/styles/blog.module.scss';
import Footer from '../components/footer';

const blog = [
  {img: '/images/blog_image1.webp', cont: 'A stay to remember: our guide to romantic couple getaways', date: 'February 9, 2024'},
  {img: '/images/blog_image2.webp', cont: 'Explore, relax, and enjoy: discover the best experiences', date: 'March 6, 2024'},
  {img: '/images/blog_image3.webp', cont: 'Elevate your stay: unforgettable experiences await', date: 'March 28, 2024'},
  {img: '/images/blog_image4.webp', cont: 'Refresh and unwind: the ultimate poolside experience with breathtaking views', date: 'April 3, 2024'},
  {img: '/images/about-main-image.webp', cont: 'Craft your reading list for a perfect getaway: choose a few favorite books to enjoy while you relax.', date: 'April 30, 2024'},
  {img: '/images/10.webp', cont: 'Take a moment to reconnect with your inner self as you rest and unwind.', date: 'May 5, 2024'}

]

const Blog = () => {
  return (
    <main>
      <Header />
      <div className={styles.container}>
        <section className={styles.blog}>
          <div className={styles.title}>
            <h2>
            EXPERIENCE SERENITY IN EVERY ROOM
            </h2>
            <p>
              Stay updated with the latest news from the Crown Residence team. Be sure to check back often, or subscribe to our mailing list to receive the newest updates straight to your inbox
            </p>
          </div>
          <div className={styles.card_container}>
            {blog.map((content, index) =>(
              <div key={index} className={styles.card}>
                <article>
                  <img src={content.img} alt="" />
                  <p className={styles.content}>{content.cont}</p>
                </article>
                <p className={styles.date}>Posted on {content.date}</p>
              </div>
             ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

export default Blog