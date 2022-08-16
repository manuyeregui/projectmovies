import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

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

    /*const control = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        inView ? control.start('visible') : control.start('hidden')
    }, [control, inView])*/

    const posterAnims = {
        first: { width: '12vw', left: 0 , opacity: 1, filter: 'brightness(1)' },
        second: { width: '10vw', left: '6vw', opacity: 0.8, filter: 'brightness(0.85)' },
        third: { width: '8vw', left: '10vw', opacity: 0.6, filter: 'brightness(0.7)' },
        outsideFirst: { y: -100, opacity: 0 },
        insideFirst: { y: 0, opacity: 1 },
        fastestTransition: {duration: 0.2, delay: 0.1},
        outsideThird: { opacity: 0, x: 100 },
        insideThird: { opacity: 0.6, x: 0 },
        intermediateTransition: {duration: 0.2, delay: 0.15},
        slowestTransition: {duration: 0.2, delay: 0.2},
        firstExit: { opacity: 0, y: -100, zIndex: 4, transition: {duration: 0.1} },
        thirdExit: { opacity: 0, x: 100, transition: {duration: 0.1} }

    }

    const contentAnims = {
        fromLeft: { opacity: 0, x: -100 },
        fromRight: { opacity: 0, x: 100 },
        fastest: { opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.1} },
        intermediate: { opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.2} },
        slowest: { opacity: 1, x: 0, transition: {duration: 0.2, delay: 0.3} }
    }

    const contentBoxAnims = {
        hidden: {opacity: 0},
        visible: {opacity: 1}
    }

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
                    initial={lastBtnPressed === 'next' ? { opacity: 0, x: 100 } : { opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0, transition: {duration: 0.1, delay: 0.2} }}
                    exit={lastBtnPressed === 'next' ? { opacity: 0, x: -100, transition: {duration: 0.1} } : { opacity: 0, x: 100, transition: {duration: 0.1} }}
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
                                variants={posterAnims}
                                initial={lastBtnPressed === 'next' ? 'second' : 'outsideFirst'}
                                animate={lastBtnPressed === 'next' ? 'first' : 'insideFirst'}
                                exit={lastBtnPressed === 'next' && 'firstExit'}
                                transition={lastBtnPressed === 'next' ? 'fastestTransition' : 'slowestTransition'}
                                key={moviesList[index].poster_path + '-first'}
                                src={'https://image.tmdb.org/t/p/original/' + moviesList[index].poster_path}
                                className='fullscreen-poster'
                            />

                            {moviesList[index + 1] &&
                                <motion.img
                                    variants={posterAnims}
                                    initial={lastBtnPressed === 'next' ? 'third' : 'first'}
                                    animate={'second'}
                                    transition={'intermediateTransition'}
                                    key={moviesList[index + 1].poster_path + '-second'}
                                    src={'https://image.tmdb.org/t/p/original/' + moviesList[index + 1].poster_path}
                                    className='fullscreen-poster2'
                                />
                            }

                            {moviesList[index + 2] &&
                                <motion.img
                                    variants={posterAnims}
                                    initial={lastBtnPressed === 'next' ? 'outsideThird' : 'second'}
                                    animate={lastBtnPressed === 'next' ? 'insideThird' : 'third'}
                                    transition={lastBtnPressed === 'next' ? 'slowestTransition' : 'fastestTransition'}
                                    exit={lastBtnPressed === 'back' && 'thirdExit'}
                                    key={moviesList[index + 2].poster_path + '-third'}
                                    src={'https://image.tmdb.org/t/p/original/' + moviesList[index + 2].poster_path}
                                    className='fullscreen-poster3'
                                />
                            }
                        </AnimatePresence>
                    </div>

                    <div className='inner-fullscreen-content-box' /*ref={ref} variants={contentBoxAnims} initial='hidden'*/>

                        <motion.div
                            variants={contentAnims}
                            initial={lastBtnPressed === 'next' ? 'fromRight' : 'fromLeft'}
                            animate={'slowest'}
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
                            variants={contentAnims}
                            initial={lastBtnPressed === 'next' ? 'fromRight' : 'fromLeft'}
                            animate={'intermediate'}
                            key={moviesList[index].title}
                        >
                            {moviesList[index].title}
                        </motion.h2>

                        <motion.p
                            variants={contentAnims}
                            initial={lastBtnPressed === 'next' ? 'fromRight' : 'fromLeft'}
                            animate={'fastest'}
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