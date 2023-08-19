import hero from '../assets/nike-g95a755c40_1920.jpg'
import electronics from '../assets/business-g03429ea17_1920.jpg'
import clothes from '../assets/cold-g2dc4f57ba_1920.jpg'
import jewelry from '../assets/jewel-g560714859_1920.jpg'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import './HeaderImage.css'


const HeaderImage = () => {
    return (
        <div className="header-image">
        <div className="hero-container">
            <img className='hero-img' src={hero} alt="" />
            <motion.div 
            variants={{
                hidden: {opacity: 0, y:75},
                visible: {opacity: 1, y:0}
            }}
            initial="hidden"
            animate="visible"
            transition={{duration:0.5}} className="text-container">
                <h1>FakeStore API</h1>
                <h2>NOTHING'S REAL</h2>
                <a href="#1"><button className='shop-now'>Shop now</button></a>
            </motion.div>
        </div>
        <motion.div 
        variants={{
            hidden: {opacity: 0, },
            visible: {opacity: 1, }
        }}
        initial="hidden"
        animate="visible"
        transition={{duration:0.6}}

        className="categories-container">
                <Link to='/clothing' className="category">
                    <img className='category-img' src={clothes} alt="" />
                    <div className="category-text">
                    Clothes
                    </div>
                </Link>
                <div className="category">
                    <img className='category-img' src={electronics} alt="" />
                    <div className="category-text">
                        Electronics
                    </div>
                </div>
                
                <Link className="category" to={'/jewelry'}>
                    <img className='category-img' src={jewelry} alt="" />
                    <div className="category-text">
                        Jewelry
                    </div>
                </Link>
                
        </motion.div>
        </div>
    )
}

export default HeaderImage