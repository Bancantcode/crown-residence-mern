// import React from 'react'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, background } from './anim';
import { useState } from 'react';
import styles from './style.module.scss'
import Nav from './nav';
import User from '/images/user.png';

const Header = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.bar}>
                <Link href="/">Crown Residence</Link>
                <div onClick={() => {setIsActive(!isActive)}} className={styles.el}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                    <div className={styles.label}>
                        <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>Menu</motion.p>
                        <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>Close</motion.p>
                    </div>
                </div>
                <motion.div variants={opacity} animate={!isActive ? "open" : "closed"} className={styles.shopContainer}>
                    <p className={styles.shop}>Shop</p>
                    <div className={styles.el}>
                        <img src={User} alt={blur} width="19" height="20" />
                        <a href="/register" className={styles.login}>
                            <p className={styles.login}>Login (0)</p>
                        </a>
                    </div>
                </motion.div>
            </div>
            <motion.div variants={background} initial="initial" animate={isActive ? "open" : "closed"} className={styles.background}></motion.div>
            <AnimatePresence mode="wait">
                {isActive && <Nav/>}
            </AnimatePresence>
        </header>
    )
}

export default Header;
