import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function FullScreenMovies(props) {

    const [moviesList, setMoviesList] = useState([]);
    const [loadingMovie, setLoadingMovie] = useState(true);

    const [index, setIndex] = useState(0);

    /*const [movie, setMovie] = useState(null);*/

    const getMoviesList = async () => {

        let rawData = await fetch(props.api);
        let data = await rawData.json()

        setLoadingMovie(false)
        setMoviesList(data.results.filter(m => m.popularity > 5 && m.original_language !== 'hi'))
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

    const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);

    const changeLoading = () => {
        setTimeout(() => {setIsBackdropLoaded(true)}, 100)
        
    }

    return (
        !loadingMovie &&
        <div className='homepage-fullscreen-box'>

            <motion.img
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0, transition: {duration: 0.2} }}
                exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                key={moviesList[index].backdrop_path}
                className={!isBackdropLoaded ? 'full-screen-img loading-movie' : 'full-screen-img loading-movie loaded'}
                src={'https://image.tmdb.org/t/p/w300/' + moviesList[index].backdrop_path}
            />

            <motion.img
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0, transition: {duration: 0.2} }}
                exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                key={'loading' + moviesList[index].backdrop_path}
                className='full-screen-img'
                loading='lazy'
                src={'https://image.tmdb.org/t/p/original/' + moviesList[index].backdrop_path}
                onLoad={changeLoading}
            />
            
            <div className='gradient'>
                <div className='fullscreen-content-box' ref={content}>
                    <div className='inner-fullscreen-content-box'>

                        {moviesList[index].tagline &&
                        <motion.h6
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.4} }}
                            exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                            key={moviesList[index].tagline}
                        >
                            {moviesList[index].tagline}
                        </motion.h6>}

                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.3} }}
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

                        <motion.h2
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.2} }}
                            exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                            key={moviesList[index].title}
                        >
                            {moviesList[index].title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.1} }}
                            exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                            className={showOverview ? null : 'display-none'}
                            key={moviesList[index].overview}
                        >
                            {moviesList[index].overview}
                        </motion.p>

                        <h3>{props.title}</h3>

                        <div>
                            <span
                                onClick={previousIndex}
                                className={index === 0 ? "material-symbols-rounded switchmovie-inactive" : "material-symbols-rounded switchmovie-active"}
                            >
                                arrow_back_ios
                            </span>
                            <span
                                onClick={nextIndex}
                                className={index + 1 === moviesList.length ? "material-symbols-rounded switchmovie-inactive" : "material-symbols-rounded switchmovie-active"}
                            >
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default FullScreenMovies