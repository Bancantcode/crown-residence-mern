import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, background } from './anim';
import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import Nav from './nav';
import User from '/images/user.png';

const Header = () => {
    const [isActive, setIsActive] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Assuming you store the username in localStorage when the user logs in
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.bar}>
                <Link to="/">Crown Residence</Link>
                <div onClick={() => { setIsActive(!isActive) }} className={styles.el}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                    <div className={styles.label}>
                        <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>Menu</motion.p>
                        <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>Close</motion.p>
                    </div>
                </div>
                <motion.div variants={opacity} animate={!isActive ? "open" : "closed"} className={styles.shopContainer}>
                    <p className={styles.shop}>Shop</p>
                    <div className={styles.el}>
                        <img src={User} alt="User" width="19" height="20" />
                        <Link to="/login" className={styles.login}>
                            <p className={styles.login}>{username ? username : 'Login'}</p>
                        </Link>
                    </div>
                </motion.div>
            </div>
            <motion.div variants={background} initial="initial" animate={isActive ? "open" : "closed"} className={styles.background}></motion.div>
            <AnimatePresence mode="wait">
                {isActive && <Nav />}
            </AnimatePresence>
        </header>
    );
}

export default Header;
