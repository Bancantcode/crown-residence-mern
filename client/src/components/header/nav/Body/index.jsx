import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blur, translate } from '../../anim';
import styles from './style.module.scss'
import PropTypes from 'prop-types';

const Body = ({links, selectedLink, setSelectedLink}) => {
    const getChars = (word) => {
        let chars = [];
        word.split("").forEach( (char, i) => {
          chars.push(
            <motion.span 
                custom={[i * 0.02, (word.length - i) * 0.01]} 
                variants={translate} initial="initial" 
                animate="enter" 
                exit="exit" 
                key={char + i}>
                {char}
            </motion.span>
            )
        })
        return chars;
    }
    
    return (
        <div className={styles.body}>
        {
            links.map( (link, index) => {
                const { title, href } = link;
                return <Link key={`l_${index}`} to={href}>
                <motion.p 
                    onMouseOver={() => {setSelectedLink({isActive: true, index})}} 
                    onMouseLeave={() => {setSelectedLink({isActive: false, index})}} 
                    variants={blur} 
                    animate={selectedLink.isActive && selectedLink.index != index ? "open" : "closed"}>
                    {getChars(title)}
                </motion.p>
                </Link>
            })
        }
        </div>
    )
}

Body.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedLink: PropTypes.shape({
        isActive: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired,
    }).isRequired,
    setSelectedLink: PropTypes.func.isRequired,
};

export default Body
