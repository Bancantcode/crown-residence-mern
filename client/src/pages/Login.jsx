import styles from '../assets/styles/signup-signin.module.scss';
import RegisterImage from '/images/signup3.webp';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { emailOrUsername, password, });

      // console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('userID', response.data.userID);
      navigate('/');
    } 
    catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Login failed! Please try again.');
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse?.credential;
    // const decoded = jwtDecode(token);
    // console.log(decoded);

    try {
      const response = await axios.post('http://localhost:5000/authGoogle/google/callback', { token });
      // console.log('Google login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('userID', response.data.userID);
      navigate('/');
    } 
    catch (error) {
      console.error('Google login failed:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Google login failed! Please try again.');
    }
  };

  return (
    <main className={styles.container}>
      <img src={RegisterImage} alt="Sign Up Image" />
      <div className={styles.content__container}>
        <h1 className={styles.sign}>Sign In to Crown Residence</h1>
        <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => { console.log('Google Login Failed'); }} />
        <p className={styles.other__method}><span>----------------</span> or sign in with email <span>----------------</span></p>
        <form className={styles.form} onSubmit={handleLogin}>
          <label>Username or email address *<input name="emailOrUsername" type="text" required value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)} /></label>
          <label>Password *<input name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          <div className={styles.container2}>
            <label className={styles.checkbox}><input type="checkbox" className={styles.box} /> Remember </label>
            <button type="submit" className={styles.submit__button}>Sign In<i className="ri-arrow-right-line"></i></button>
          </div>
            <div className={styles.account}>Don&apos;t have an account? 
              <Link className={styles.new__page} to={"/register"}> Create Account</Link>
            </div>
        </form>
      </div>
      <div className={styles.home}>
        <Link to={"/"}><img className={styles.home__nav} src="/images/home.png" width={50} height='50' /></Link>
      </div>
    </main>
  );
}

export default Login;
