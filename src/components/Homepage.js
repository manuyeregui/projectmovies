import React from 'react';
import MoviesWrapper from './MoviesCarousel/MoviesWrapper';
import { motion } from 'framer-motion';

function Homepage() {

  return (
    <main>
      <motion.div id="wrapper"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
      >
          <MoviesWrapper title="TOP RATED." api={'https://api.themoviedb.org/3/movie/top_rated?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'} showRating={true}/>
          <MoviesWrapper title="POPULAR RIGHT NOW." api={'https://api.themoviedb.org/3/movie/popular?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'} showRating={true}/>
          <MoviesWrapper title="UPCOMING." api={'https://api.themoviedb.org/3/movie/upcoming?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'} showRating={false}/>
      </motion.div>
    </main>
  );
}

export default Homepage;