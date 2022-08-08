import { React } from 'react'
import { Link } from 'react-router-dom';
import Tilt from 'react-vanilla-tilt';
import { motion } from 'framer-motion';

function MovieInGrid(props) {

    return (
        <Link to={'/movies/' + props.id} key={props.id}>
            <Tilt style={{background: 'transparent', boxShadow: 'none'}} options={{}}>
            {
                props.poster_path != null
                ?
                    <motion.img 
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                        key={props.id}
                        src={'https://image.tmdb.org/t/p/original' + props.poster_path}
                    />
                :
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                        className='null-poster-movie'
                    >
                        {props.title}
                    </motion.div>
                
            }
            </Tilt>
        </Link>
    )
}

export default MovieInGrid