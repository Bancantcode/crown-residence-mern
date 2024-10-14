import styles from '../assets/styles/register.module.scss'
import RegisterImage from '/images/signup1.webp'
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  })

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // will remove this 
  function click() {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <main className={styles.container}>
      <img src={RegisterImage} alt="Sign Up Image" />
      <div className={styles.content__container}>
        <h1 className={styles.sign}>Sign Up to Crown Residence</h1>
        <GoogleLogin className={styles.google__login}
          onSuccess={credentialResponse => {
            const decoded = jwtDecode(credentialResponse?.credential);
            console.log(decoded);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <p className={styles.other__method}>or sign up with email</p>
        <form className={styles.form} action=''>
          <label>Username *
            <input name="userName" value={formData.userName} onChange={handleChange} type="text" required /></label>
          <label>Email address *
            <input name="email" value={formData.email} onChange={handleChange} type="email" required /></label>
          <label>Password *
            <input name="password" value={formData.password} onChange={handleChange} type="password" required /></label>
        </form>
        <div className={styles.container2}>
          <label>
            <input type="checkbox" />Remember 
          </label>
          <button type="submit" className={styles.submit__button} onClick={click}>Sign Up<i className="ri-arrow-right-line"></i></button>
          <div>Already have an account? 
            <Link className={styles.new__page} to={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Register
