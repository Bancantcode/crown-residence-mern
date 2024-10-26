
import styles from '../assets/styles/contact.module.scss';
import ContactHero from '/images/contact_hero.webp';
import { useState, useContext } from 'react';
import axios from '../api/axios';
import Header from '../components/header'
import Footer from '../components/footer';

const container =[
  {role:'Team Lead / Frontend Dev Lead', name:'Bryan Aaron Santiago', email:'santiagobryan831@gmail.com'},
  {role:'Backend Dev Lead', name:'Renell Constantino', email:'rmarioanoconstantino@gmail.com'},
  {role:'Frontend Dev', name:'Frances Tumampos', email:'tumamposfrances@gmail.com'},
  {role:'Frontend Dev', name:'Cayoh Anicete', email:'cayohallouu@gmail.com'},
  {role:'Frontend Dev', name:'Vladimir Borja', email:'vladimirborja013@gmail.com'}
]

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/auth/register', formData);
      alert('successful!');      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'please check your information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Header />
      <div className={styles.container}>  
          {/* <img src={ContactHero} className={styles.landing} alt="Hero Image of contact" />  */}
          {/* <div className={styles.img_container}>
            <h1>Find your perfect home with us</h1>      
          </div>  */}
          <section className={styles.content}>
            <div className={styles.about_container}>
              <span className={styles.category}>[REACT OUT]</span>
              <h1 className={styles.title}>If you&apos;re excited to experience Crown Residence, feel free to get in touch! We’d love to hear from you about your stay plans. Give us a call or send us an email. You can find the contact details of the best person to reach out to below, and we’ll get back to you as soon as possible.</h1>
            </div>
          </section>

          <div className={styles.cards}>
            <section className={styles.contact}>
              <img src="/images/contact_image1.webp" alt="contact image" />
              <div className={styles.card_content}>
                <div>
                  <p className={styles.card_category}>[PEOPLE]</p>
                  <h1 className={styles.card_title}>CONTACT</h1>
                </div>
                {container.map((content, index) => (
                  <div key={index}>
                    <p className={styles.title}>{content.role}</p>
                    <p className={styles.name}>{content.name}</p>
                    <a className={styles.link} href={`mailto:${content.email}`}>{content.email}</a>                  
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.navigation}>
              <img src="/images/contact_image2.webp" alt="navigation image" />
              <article className={styles.card_content}>
                <div>
                  <p className={styles.card_category}>[WEBSITE]</p>
                  <h1 className={styles.card_title}>NAVIGATION</h1>
                </div>
                <div>
                  <p className={styles.title}>Pages</p>
                  <a href='/'>Home</a>                  
                  <a href='/about'>About Us</a>                  
                  <a href='/property'>Property</a>                  
                  <a href='/blog'>Blog</a>                  
                  <a href='/reserved-property'>Reserved Property</a> 
                </div>                
                <div>
                  <p className={styles.title}>Details</p>
                  <a href='tel:+639282977154'>+639282977154</a>                  
                  <a href='mailto:crownresidence@hau.dev'>crownresidence@hau.dev</a>                                 
                </div>
              </article>
            </section>

            <section className={styles.socials}>
              <img src="/images/contact_image3.webp" alt="socials image" />
              <article className={styles.card_content}>
                <div>
                  <p className={styles.card_category}>[FOLLOW US]</p>
                  <h1 className={styles.card_title}>SOCIALS</h1>
                </div>
                <div>
                  <p className={styles.title}>Networks</p>
                  <a target='_blank' href='https://www.youtube.com/'>Youtube</a>                  
                  <a target='_blank' href='https://x.com/?lang=en'>X</a>                  
                  <a target='_blank' href='https://www.facebook.com/'>Facebook</a>                  
                  <a target='_blank' href='https://www.linkedin.com/in/bryanaaronsantiago/'>LinkedIn</a>                  
                  <a target='_blank' href='https://www.instagram.com/eee.bnwgn/?next=%2F'>Instagram</a>   
                </div>              
              </article>
            </section>
          </div>
      </div>
      <Footer />
    </main>
  );
};

export default Contact;
