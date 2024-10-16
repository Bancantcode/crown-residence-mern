// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/profile')
        .then(response => setUser(response.data))
        .catch(() => {
          setUser(null);
          setToken('');
          localStorage.removeItem('token');
        });
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post('/auth/login', { email, password });
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  const googleLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('/profile')
      .then(response => setUser(response.data))
      .catch(() => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
      });
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
