
import styles from '../assets/styles/contact.module.scss';
import ContactImage from '/images/contact-header.png';
import ContactImage2 from '/images/contact image.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from '../api/axios';



const Contact = () => {
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    phonenumber: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/auth/register', formData);
      alert('successful!');
      setFormData({ fName: '', lName: '', phonenumber: '', email: '', subject: '', message: '', }); // Reset form
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'please check your information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main  className={styles.header}>
      <img src={ContactImage} alt="Contact" />
      <div className={styles.content__container}>
        <h1  className={styles.h1}> Get in touch. </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label  className={styles.fname}>First Name</label>
          <label>
            <input name="fName" value={formData.fName} onChange={handleChange} type="text" required />
          </label>
          <label>Last Name </label>
          <label>
            <input name="lName" value={formData.lName} onChange={handleChange} type="text" required />
          </label>
          <label>Email address </label>
          <label>
            <input name="email" value={formData.email} onChange={handleChange} type="email" required />
          </label>
          <label>Phone Number </label>
          <label>
            <input name="phonenumber" value={formData.phonenumber} onChange={handleChange} type="text" required />
          </label>
          <label>Subject </label>
          <label>
            <input name="subject" value={formData.subject} onChange={handleChange} type="text" required />
          </label>
          <label>Message </label>
          <label className={styles.message}>
            <input name="message" value={formData.message} onChange={handleChange} type="text" required />
          </label>
          <div className={styles.container2}>
            <button type="submit" className={styles.submit__button} disabled={loading}>
             {loading ? 'Submitting...' : 'Submit'} 
            </button>
              <button type="delete" className={styles.delete__button} disabled={loading}>
              {loading ? 'Deleting ...' : 'Delete'} 
            </button>
          </div>
        </form>

        <div className={styles.container2}>
            <button type="" className={styles.card} >
              <i class="ri-map-pin-line ri-3x"></i>
              <h1> Visit Us </h1> <br></br>
              <p>Unit 1 Ground Floor, Acacia Building, 
                  Sto. Rosario, Angeles City, 
                  Pampanga, Philippines</p>
            </button>

            <button type="" className={styles.card} >
              <i class="ri-phone-line  ri-3x"></i>
              <h1> Call Us </h1><br></br>
              <p>(+63) 912 345 67</p>
            </button>

            <button type="" className={styles.card} >
            <i class="ri-mail-open-line  ri-3x"></i>
              <h1> Send an email </h1><br></br>
              <p>crownresidence@email.com</p>
            </button>
          </div>
      </div>

      <div className={styles.content__container2}>
        <img src={ContactImage2} alt="Contact" />
        <div>
        <h1 className={styles.h11}>Subscribe to our Newsletter.</h1>
          <p className={styles.p1}>Stay informed with the latest updates, exclusive discounts, promotions, and exciting offers by subscribing to our newsletter. Join our community to receive timely information and special deals directly to your inbox!</p>
          <form className={styles.form3} onSubmit={handleSubmit}>
            <label>Email address </label>
              <label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" required />
            </label>
          </form>
          <div className={styles.container2}>
            <button type="subscribe" className={styles.submit__button2} disabled={loading}>
            {loading ? 'Subscribing...' : 'Subscribe Now'} 
            </button>
          </div>
          </div>
      </div>
      <br></br>

    
      
      
      
      
      

    </main>

    
  );
};

export default Contact;
