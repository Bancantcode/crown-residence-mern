import styles from '../assets/styles/signup-signin.module.scss';
import RegisterImage from '/images/signup1.webp';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const response = await axios.post('/auth/register', formData);
      alert('Registration successful! You can now log in.');
      setFormData({ userName: '', email: '', password: '' }); // Reset form
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse?.credential;
    const decoded = jwtDecode(token);
    console.log(decoded);

    try {
      const response = await axios.post('http://localhost:5000/authGoogle/google/callback', { token });
      console.log('Google login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      navigate('/');
    } 
    catch (error) {
      console.error('Google login failed:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Google login failed! Please try again.');
    }
  };


return (
  <main className={styles.container}>
    <img src={RegisterImage} alt="Sign Up" />
    <div className={styles.content__container}>
      <h1 className={styles.sign}>Sign Up to Crown Residence</h1>
      <GoogleLogin className={styles.google__login} onSuccess={handleGoogleLoginSuccess} onError={() => { console.log('Login Failed'); }} disabled={loading} />
      <p className={styles.other__method}><span>----------------</span> or sign up with email <span>----------------</span></p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Username *<input name="userName" value={formData.userName} onChange={handleChange} type="text" required /></label>
        <label>Email address *<input name="email" value={formData.email} onChange={handleChange} type="email" required /></label>
        <label>Password *<input name="password" value={formData.password} onChange={handleChange} type="password" required /></label>
        <div className={styles.container2}>
          <label className={styles.checkbox}><input className={styles.box} type="checkbox" />Remember</label>
          <button type="submit" className={styles.submit__button} disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'} <i className="ri-arrow-right-line"></i>
          </button>
        </div>
        <div className={styles.account}>Already have an account? 
        <Link className={styles.new__page} to={"/login"}> Login</Link>
      </div>
      </form>
    </div>
    <div className={styles.home}>
        <Link to={"/"}><img className={styles.home__nav} src="/images/home.png" width={50} height='50' /></Link>
    </div>
  </main>
);
};

export default Register;
