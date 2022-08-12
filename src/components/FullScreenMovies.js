import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function FullScreenMovies(props) {

    const [moviesList, setMoviesList] = useState([]);
    const [loadingMovie, setLoadingMovie] = useState(true);

    const [moviesListLength, setMoviesListLength] = useState(null);

    const [index, setIndex] = useState(0);

    /*const [movie, setMovie] = useState(null);*/

    const getMoviesList = async () => {

        let rawData = await fetch(props.api);
        let data = await rawData.json()

        setLoadingMovie(false)
        setMoviesListLength(data.results.length)
        setMoviesList(data.results)
    }

    useEffect(() => {
        getMoviesList()
    }, [])

    /*useEffect(() => {
        console.log(movie);
        setMovie(moviesList[index]);
        
        console.log(movie);
    }, []);*/

    const nextIndex = () => {
        setIndex(index + 1)
        /*setMovie(moviesList[index])*/
        console.log(index);
    }

    const previousIndex = () => {
        setIndex(index - 1)
        /*setMovie(moviesList[index])*/
        console.log(index);
    }

    const [showOverview, setShowOverview] = useState(true);

    const content = useRef();

    useEffect(() => {
        setTimeout(() => {
            content.current.clientWidth < 1000 && setShowOverview(false)
        }, 100);
        
    }, [])

    return (
        !loadingMovie &&
        <div className='homepage-fullscreen-box'>

            <motion.img
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0, transition: {duration: 0.2} }}
                exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                key={moviesList[index].backdrop_path}
                className='full-screen-img' src={'https://image.tmdb.org/t/p/original/' + moviesList[index].backdrop_path}
            />
            
            <div className='gradient'>
                <div className='fullscreen-content-box' ref={content}>
                    <div className='inner-fullscreen-content-box'>

                        <div>
                            <motion.span
                                onClick={previousIndex}
                                className={index === 0 ? "material-symbols-rounded switchmovie-inactive" : "material-symbols-rounded switchmovie-active"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: {duration: 0.2} }}
                                exit={{ opacity: 0, transition: {duration: 0.2} }}
                                key={'next' + index}
                            >
                                arrow_back_ios
                            </motion.span>
                            <motion.span
                                onClick={nextIndex}
                                className={index + 1 === moviesList.length ? "material-symbols-rounded switchmovie-inactive" : "material-symbols-rounded switchmovie-active"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: {duration: 0.2} }}
                                exit={{ opacity: 0, transition: {duration: 0.2} }}
                                key={'back' + index}
                            >
                                arrow_forward_ios
                            </motion.span>
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.1} }}
                            exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                            key={moviesList[index].title}
                        >
                            {moviesList[index].title}
                        </motion.h2>

                        {moviesList[index].tagline &&
                        <motion.h6
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.2} }}
                            exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                            key={moviesList[index].tagline}
                        >
                            {moviesList[index].tagline}
                        </motion.h6>}

                        <motion.p
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.3} }}
                            exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                            className={showOverview ? null : 'display-none'}
                            key={moviesList[index].overview}
                        >
                            {moviesList[index].overview}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.4} }}
                            exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                            key={'/movies/' + moviesList[index].id}
                        >
                            <Link
                                to={'/movies/' + moviesList[index].id}
                                className='details-button'
                            >
                                View Details
                                <span className="material-symbols-rounded">
                                    arrow_forward_ios
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default FullScreenMovies