import { React } from 'react';
import { motion } from 'framer-motion';
import PersonMovies from './PersonMovies';
import PersonData from './PersonData';

function Personpage() {

    

    return (
        <motion.div id="wrapper"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
        >
            <div className='personpage-box'>
                <div className='personal-data-box'>
                    <div className='personpage-left-column'>
                        <PersonData/>
                    </div>
                    <div className='personpage-right-column'>
                        <PersonMovies/>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Personpage