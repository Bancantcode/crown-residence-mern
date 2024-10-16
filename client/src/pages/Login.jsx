import styles from '../assets/styles/signup-signin.module.scss'
import RegisterImage from '/images/signup3.webp'
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
// import { useState } from 'react';

const Login = () => {
  return (
    <main className={styles.container}>
      <img src={RegisterImage} alt="Sign Up Image" />
      <div className={styles.content__container}>
        <h1 className={styles.sign}>Sign In to Crown Residence</h1>
        <GoogleLogin className={styles.google__login}
          onSuccess={credentialResponse => {
            const decoded = jwtDecode(credentialResponse?.credential);
            console.log(decoded);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <p className={styles.other__method}>or sign in with email</p>
        <form className={styles.form} action=''>
          <label>Username or email address *
            <input name="userName" type="text" required /></label>
          <label>Password *
            <input name="password" type="password" required /></label>
        </form>
        <div className={styles.container2}>
          <label>
            <input type="checkbox" />Remember 
          </label>
          <button type="submit" className={styles.submit__button}>Sign In<i className="ri-arrow-right-line"></i></button>
          <div>Don&apos;t have an account? 
            <Link className={styles.new__page} to={"/register"}>Create Account</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login