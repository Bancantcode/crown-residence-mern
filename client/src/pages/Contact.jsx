
import styles from '../assets/styles/contact.module.scss';
import ContactImage from '/images/contact.webp';
import ContactImage2 from '/images/contact image.jpg';
import { Link, useNavigate } from 'react-router-dom';
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
          <img src={ContactImage} className={styles.landing} alt="Contact" /> 
          <div className={styles.img_container}>
            <h1>Find your perfect home with us</h1>      
          </div> 
        <section className={styles.content}>
          <div className={styles.about_container}>
            <span className={styles.category}>[REACT OUT]</span>
            <h1 className={styles.title}>If you're excited to experience Crown Residence, feel free to get in touch! We’d love to hear from you about your stay plans. Give us a call or send us an email. You can find the contact details of the best person to reach out to below, and we’ll get back to you as soon as possible.</h1>
          </div>
        </section>

          <div className={styles.cards}>

            <section className={styles.contact}>
              <img src="/images/2.webp" alt="" />
              <div className={styles.card_content}>
                <div>
                  <p className={styles.card_category}>[PEOPLE]</p>
                  <h1 className={styles.card_title}>CONTACT</h1>
                </div>
                {container.map((content) => (
                  <div>
                    <p className={styles.title}>{content.role}</p>
                    <p className={styles.name}>{content.name}</p>
                    <a className={styles.link} href={`mailto:content.email`}>{content.email}</a>                  
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.navigation}>
              <img src="/images/2.webp" alt="" />
              <article className={styles.card_content}>
                <div>
                  <p className={styles.card_category}>[WEBSITE]</p>
                  <h1 className={styles.card_title}>NAVIGATION</h1>
                </div>
                <div>
                  <p className={styles.title}>Pages</p>
                  <a href=''>Home</a>                  
                  <a href=''>About Us</a>                  
                  <a href=''>Property</a>                  
                  <a href=''>Blog</a>                  
                  <a href=''>Reserved Property</a> 
                </div>                
                <div>
                  <p className={styles.title}>Details</p>
                  <a href=''>+639282977154</a>                  
                  <a href=''>crownresidence@hau.dev</a>                                 
                </div>
              </article>
            </section>

            <section className={styles.socials}>
              <img src="/images/2.webp" alt="" />
              <article className={styles.card_content}>
                <div>
                  <p className={styles.card_category}>[WEBSITE]</p>
                  <h1 className={styles.card_title}>NAVIGATION</h1>
                </div>
                <div>
                  <p className={styles.title}>Networks</p>
                  <a href=''>Youtube</a>                  
                  <a href=''>X</a>                  
                  <a href=''>Facebook</a>                  
                  <a href=''>LinkedIn</a>                  
                  <a href=''>Instagram</a>   
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
