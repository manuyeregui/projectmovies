import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Movie from './Movie';

function MoviesWrapper(props) {

    const [loading, setLoading] = useState(true)

    const [movies, setMovies] = useState([]);
    
    const [carouselWidth, setCarouselWidth] = useState([]);
    const carousel = useRef();

    const getMovies = async () => {
        const rawData = await fetch(props.api);
        const data = await rawData.json();

        const newData = await data.results.filter(m => (m.popularity > 5 && m.original_language !== 'hi'))

        setLoading(false)
        setMovies(newData)
    }

    useEffect(() => {
        getMovies();
    }, [])

    useEffect(() => {
      setCarouselWidth(carousel.current.scrollWidth - carousel.current.offsetWidth + 10)
    }, [movies])

    const loadingMovies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className='section-wrapper'>
      <h2>{props.title}</h2>
      <motion.div className='movies-box' ref={carousel}>
        <motion.div className='inner-movies-box' drag="x" dragConstraints={{right: 0, left: -carouselWidth}}>

          {loading === true ?
          
            loadingMovies.map (l => <div className='loading-movie' key={'loadingMovie' + l}/>) :
            
            movies.map (m => <Movie poster={"https://image.tmdb.org/t/p/original/" + m.poster_path} title={m.title} rating={m.vote_average} id={m.id} key={'carouselMovie' + m.id}/>)}
          
        </motion.div>
      </motion.div>
    </div>
  )
}

export default MoviesWrapper