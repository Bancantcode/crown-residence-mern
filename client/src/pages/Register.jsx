import styles from '../assets/styles/signup-signin.module.scss';
import RegisterImage from '/images/signup1.webp';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useState, useContext } from 'react';
import axios from '../api/axios';
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
    setLoading(true);
    try {
        const { credential } = credentialResponse;
        console.log('Credential Token:', credential); // Check this value

        const response = await axios.get('/authGoogle/google/callback', { params: { token: credential } });

        console.log('Response from server:', response.data);
        // Continue your logic...
    } catch (err) {
        console.error('Google Login Failed:', err);
        alert(err.response?.data?.message || 'Google login failed!');
    } finally {
        setLoading(false);
    }
};

return (
  <main className={styles.container}>
    <img src={RegisterImage} alt="Sign Up" />
    <div className={styles.content__container}>
      <h1 className={styles.sign}>Sign Up to Crown Residence</h1>
      <GoogleLogin
        className={styles.google__login}
        onSuccess={handleGoogleLoginSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
        disabled={loading} // Disable if loading
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
