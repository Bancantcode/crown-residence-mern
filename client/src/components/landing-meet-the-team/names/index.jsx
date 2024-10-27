import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './style.module.scss';
import PropTypes from 'prop-types';

const anim = {
    initial: { 
        width: 0 
    },
    open: { 
        width: "auto", 
        transition: {
            duration: 0.4, 
            ease: [0.23, 1, 0.32, 1]
        }
    },
    closed: { 
        width: 0 
    }
}

export default function Index({ names }) {
    const [isActive, setIsActive] = useState(false);

    const { title1, title2, src } = names;
    
    return (
        <div onMouseEnter={() => {setIsActive(true)}} onMouseLeave={() => {setIsActive(false)}} className={styles.project}>
            <p>{title1}</p>
            <motion.div variants={anim} animate={isActive ? "open" : "closed"} className={styles.imgContainer}>
                <img src={`/images/${src}`} alt='placeholder'></img>
            </motion.div>
            <p>{title2}</p>
        </div>
    )
}

Index.propTypes = {
    names: PropTypes.shape({
        title1: PropTypes.string.isRequired,
        title2: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
    }).isRequired,
};
