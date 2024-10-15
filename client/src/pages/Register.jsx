import styles from '../assets/styles/signup-signin.module.scss';
import RegisterImage from '/images/signup1.webp';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import * as jwtDecode from "jwt-decode";
import { useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { googleLogin } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await axios.post('/auth/register', formData);
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed!'); // More specific error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setLoading(true); // Start loading
    try {
      const { credential } = credentialResponse;
      const decoded = jwtDecode(credential);
      const response = await axios.post('/authGoogle/google/callback', { token: credential });
      const token = response.data.token;
      googleLogin(token);
      navigate('/profile');
    } catch (err) {
      console.error('Google Login Failed:', err);
      alert(err.response?.data?.message || 'Google login failed!'); // More specific error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <main className={styles.container}>
      <img src={RegisterImage} alt="Sign Up Image" />
      <div className={styles.content__container}>
        <h1 className={styles.sign}>Sign Up to Crown Residence</h1>
        <GoogleLogin
          className={styles.google__login}
          onSuccess={handleGoogleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <p className={styles.other__method}>or sign up with email</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Username *
            <input name="userName" value={formData.userName} onChange={handleChange} type="text" required />
          </label>
          <label>Email address *
            <input name="email" value={formData.email} onChange={handleChange} type="email" required />
          </label>
          <label>Password *
            <input name="password" value={formData.password} onChange={handleChange} type="password" required />
          </label>
          <div className={styles.container2}>
            <label>
              <input type="checkbox" /> Remember 
            </label>
            <button type="submit" className={styles.submit__button} disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'} <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </form>
        <div>Already have an account? 
          <Link className={styles.new__page} to={"/login"}>Login</Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
