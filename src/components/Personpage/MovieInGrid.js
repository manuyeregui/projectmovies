import { React, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import Tilt from 'react-vanilla-tilt';
import { motion } from 'framer-motion';

function MovieInGrid(props) {

    const [isLoading, setIsLoading] = useState(true)

    const changeLoading = () => {
        setIsLoading(false)
    }

    const image = useRef();

    const handleError = () => {
        console.log('error');
        setTimeout(() => {
            image.current.src = 'https://image.tmdb.org/t/p/w500' + props.poster_path
        }, 50)
    }

    return (
        <Link to={'/movies/' + props.id} key={props.id}>
            <Tilt style={{background: 'transparent', boxShadow: 'none'}} options={{}}>
            {
                props.poster_path != null
                ?
                    <div>
                        <motion.img 
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0, transition: {duration: 0.2} }}
                            exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                            key={'loading' + props.id}
                            src={'https://image.tmdb.org/t/p/w92' + props.poster_path}
                            className={isLoading ? 'loading-movie' : 'loading-movie loaded'}
                        />
                        <motion.img 
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0, transition: {duration: 0.2} } }
                            exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                            key={props.id}
                            src={'https://image.tmdb.org/t/p/w500' + props.poster_path}
                            ref={image}
                            onLoad={changeLoading}
                            onError={handleError}
                        />
                    </div>
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