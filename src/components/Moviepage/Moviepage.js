import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import LeftColumnWrapper from './LeftColumnWrapper';
import RightColumnWrapper from './RightColumnWrapper';

function Moviepage() {

    const { id } = useParams();

    const [movie, setMovie] = useState(null)

    const [loadingMovie, setLoadingMovie] = useState(true)

    const getMovie = async () => {

        let rawData = await fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1');
        let data = await rawData.json();

        setLoadingMovie(false)
        setMovie(data)
    }

    useEffect(() => {
        getMovie();
    }, [])

    const recommendedMovies = 'https://api.themoviedb.org/3/movie/' + id + '/recommendations?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'



    const [isLoading, setIsLoading] = useState(true);

    const changeLoading = () => {
        setIsLoading(false)
    }


    return (
        <motion.div className='moviepage'
        initial={{ opacity: 0, x: 100}}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
        >

        {loadingMovie === false &&
        
            <div>
                        
                        {movie.backdrop_path &&
                            <div>
                                <img
                                    src={"https://image.tmdb.org/t/p/w300/" + movie.backdrop_path}
                                    className={isLoading ? 'loading-movie backdrop-img' : 'loading-movie loaded backdrop-img'}
                                    alt="Movie Backdrop"
                                />
                                <img
                                    onLoad={changeLoading}
                                    src={"https://image.tmdb.org/t/p/original/" + movie.backdrop_path}
                                    className='backdrop-img'
                                    alt="Movie Backdrop"
                                    loading='lazy'
                                />
                            </div>
                        }
                        
                        <div className='moviepage-body-box'>

                            <LeftColumnWrapper
                                backdrop={movie.backdrop_path ? true : false}
                                tagline={movie.tagline}
                                poster_path={movie.poster_path}
                                vote_average={movie.vote_average}
                                vote_count={movie.vote_count}
                            />

                            <RightColumnWrapper
                                title={movie.title}
                                release_date={movie.release_date}
                                runtime={movie.runtime}
                                overview={movie.overview}
                                genres={movie.genres}
                                production_companies={movie.production_companies}
                                production_countries={movie.production_countries}
                                spoken_languages={movie.spoken_languages}
                                recommendedMovies={recommendedMovies}
                            />
                        </div>
                        
                </div>

        }

            

        </motion.div>
    )
}

export default Moviepage