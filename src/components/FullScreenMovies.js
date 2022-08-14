import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function FullScreenMovies(props) {

    const [moviesList, setMoviesList] = useState([]);
    const [loadingMovie, setLoadingMovie] = useState(true);

    const [index, setIndex] = useState(0);
    const [lastBtnPressed, setLastBtnPressed] = useState(null)

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

    const indexForward = () => {
        setIsBackdropLoaded(false)
        setLastBtnPressed('next')

        setTimeout(() => {
            setIndex(index + 1)
        }, 50)
        
    }

    const indexBack = () => {
        setIsBackdropLoaded(false)
        setLastBtnPressed('back')

        setTimeout(() => {
            setIndex(index - 1)
        }, 50)

    }

    const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);

    const changeLoading = () => {
        setIsBackdropLoaded(true)
    }

    /*const posterAnims = {
        Second_to_First_initial: { width: '10vw', left: '6vw', opacity: 0.8, filter: 'brightness(0.9)' },
        Second_to_First_animate: { width: '12vw', left: 0 , opacity: 1, filter: 'brightness(1)' },
        Out_to_First_initial: { y: -100, opacity: 0 },
        Out_to_First_animate: { y: 0, opacity: 1 },
        First_to_Out_exit: { opacity: 0, y: -100, zIndex: 4, transition: {duration: 0.1} },
        First_to_Out_transition: {duration: 0.2, delay: 0.2},
        Out_to_First_transition: {duration: 0.2, delay: 0.1}


    }*/

    return (
        !loadingMovie &&
        <div className='homepage-fullscreen-box'>
            <AnimatePresence>

                <motion.img
                    initial={lastBtnPressed === 'next' ? { opacity: 0, x: 100 } : { opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0, transition: {duration: 0.1, delay: 0.2} }}
                    exit={lastBtnPressed === 'next' ? { opacity: 0, x: -100, transition: {duration: 0.1} } : { opacity: 0, x: 100, transition: {duration: 0.1} }}
                    key={moviesList[index].backdrop_path}
                    className={!isBackdropLoaded ? 'full-screen-img loading-movie' : 'full-screen-img loading-movie loaded'}
                    src={'https://image.tmdb.org/t/p/w300/' + moviesList[index].backdrop_path}
                />

                <motion.img
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0, transition: {duration: 0.1, delay: 0.2} }}
                    exit={{ opacity: 0, x: -100, transition: {duration: 0.05} }}
                    key={'loading' + moviesList[index].backdrop_path}
                    className='full-screen-img'
                    loading='lazy'
                    src={'https://image.tmdb.org/t/p/original/' + moviesList[index].backdrop_path}
                    onLoad={changeLoading}
                />

            </AnimatePresence>
            
            <div className='gradient'>
                <div className='fullscreen-content-box'>

                    <div className='posters-box'>
                        <AnimatePresence>
                            <motion.img
                                initial={lastBtnPressed === 'next' ? { width: '10vw', left: '6vw', opacity: 0.8, filter: 'brightness(0.85)' } : { y: -100, opacity: 0 }}
                                animate={lastBtnPressed === 'next' ? { width: '12vw', left: 0 , opacity: 1, filter: 'brightness(1)' } : { y: 0, opacity: 1 }}
                                exit={lastBtnPressed === 'next' ? { opacity: 0, y: -100, zIndex: 4, transition: {duration: 0.1} } : null}
                                transition={lastBtnPressed === 'next' ? {duration: 0.2, delay: 0.1} : {duration: 0.2, delay: 0.2}}
                                key={moviesList[index].poster_path + '-first'}
                                src={'https://image.tmdb.org/t/p/original/' + moviesList[index].poster_path}
                                className='fullscreen-poster'
                            />

                            {moviesList[index + 1] &&
                                <motion.img
                                    initial={lastBtnPressed === 'next' ? { width: '8vw', left: '10vw', opacity: 0.6, filter: 'brightness(0.7)' } : { width: '12vw', left: 0 , opacity: 1, filter: 'brightness(1)' }}
                                    animate={{ width: '10vw', left: '6vw', opacity: 0.8, filter: 'brightness(0.85)' }}
                                    transition={{duration: 0.2, delay: 0.15}}
                                    key={moviesList[index + 1].poster_path + '-second'}
                                    src={'https://image.tmdb.org/t/p/original/' + moviesList[index + 1].poster_path}
                                    className='fullscreen-poster2'
                                />
                            }

                            {moviesList[index + 2] &&
                                <motion.img
                                    initial={lastBtnPressed === 'next' ? { opacity: 0, x: 100 } : { width: '10vw', left: '6vw', opacity: 0.8, filter: 'brightness(0.85)' }}
                                    animate={lastBtnPressed === 'next' ? { opacity: 0.6, x: 0 } : { width: '8vw', left: '10vw', opacity: 0.6, filter: 'brightness(0.7)' }}
                                    transition={lastBtnPressed === 'next' ? {duration: 0.2, delay: 0.2} : {duration: 0.2, delay: 0.1}}
                                    exit={lastBtnPressed === 'back' && { opacity: 0, x: 100, transition: {duration: 0.1} }}
                                    key={moviesList[index + 2].poster_path + '-third'}
                                    src={'https://image.tmdb.org/t/p/original/' + moviesList[index + 2].poster_path}
                                    className='fullscreen-poster3'
                                />
                            }
                        </AnimatePresence>
                    </div>

                    <div className='inner-fullscreen-content-box'>

                        <motion.div
                            initial={lastBtnPressed === 'next' ? { opacity: 0, x: 100 } : { opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.3} }}
                            exit={{ opacity: 0, x:-100, transition: {duration: 0.05} }}
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
                            initial={lastBtnPressed === 'next' ? { opacity: 0, x: 100 } : { opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.2} }}
                            exit={{ opacity: 0, x:-100, transition: {duration: 0.05} }}
                            key={moviesList[index].title}
                        >
                            {moviesList[index].title}
                        </motion.h2>

                        <motion.p
                            initial={lastBtnPressed === 'next' ? { opacity: 0, x: 100 } : { opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.1} }}
                            exit={{ opacity: 0, x:-100, transition: {duration: 0.05} }}
                            key={moviesList[index].overview}
                        >
                            {moviesList[index].overview}
                        </motion.p>

                        {/*(props.showRating && moviesList[index].vote_average) &&
                        
                        <div className='movie-rating-homepage'><span className="material-symbols-rounded">star</span>{moviesList[index].vote_average.toFixed(1)}</div>
                        
                        */}

                        <h3 key={moviesList[index].id} style={{color: props.titleColor}}>{props.title}</h3>

                        <div>
                            <span
                                onClick={indexBack}
                                className={index === 0 ? "material-symbols-rounded switchmovie-inactive" : "material-symbols-rounded switchmovie-active"}
                            >
                                arrow_back_ios
                            </span>
                            <span
                                onClick={indexForward}
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