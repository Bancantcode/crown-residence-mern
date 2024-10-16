import { motion } from 'framer-motion';
import { opacity } from '../../anim';
import styles from './style.module.scss';
import PropTypes from 'prop-types';

export default function Index({src, isActive}) {
  return (
    <motion.div variants={opacity} initial="initial" animate={isActive ? "open" : "closed"} className={styles.imageContainer}>
        <img 
            src={`/images/${src}`}
            // fill={true}
            alt="image"
        />
    </motion.div>
  )
}

Index.propTypes = {
    src: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
};
