import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '../anim';
import styles from './style.module.scss';
import Body from './Body';
import Footer from './Footer';
import Image from './Image';

const links = [
    {
        title: "Home",
        href: "/",
        src: "1.webp"
    },
    {
        title: "Blog",
        href: "/blog",
        src: "2.webp"
    },
    {
        title: "Reserved",
        href: "/reserved-property",
        src: "3.webp"
    },
    {
        title: "Property",
        href: "/property",
        src: "4.webp"
    },
    {
        title: "Contact",
        href: "/contact",
        src: "5.webp"
    }
]

const Index = () => {
    const [selectedLink, setSelectedLink] = useState({isActive: false, index: 0});
    return (
        <motion.div variants={height} initial="initial" animate="enter" exit="exit" className={styles.nav}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink}/>
                <Footer />
                </div>
                <Image src={links[selectedLink.index].src} isActive={selectedLink.isActive}/>
            </div>
        </motion.div>
    )
}

export default Index;
