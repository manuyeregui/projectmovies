import React from 'react';
import MoviesWrapper from './MoviesCarousel/MoviesWrapper';
import { motion } from 'framer-motion';
import FullScreenMovies from './FullScreenMovies';

function Homepage() {

  return (
    <main>
      <FullScreenMovies title='Popular right now.' titleColor='#ffff98' api={'https://api.themoviedb.org/3/movie/popular?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'}/>
      <FullScreenMovies title='Upcoming.' titleColor='#ff8989' api={'https://api.themoviedb.org/3/movie/upcoming?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'}/>
      <FullScreenMovies title='Today trending.' titleColor='#898dff' api={'https://api.themoviedb.org/3/trending/movie/day?api_key=' + process.env.REACT_APP_TMDB_KEY}/>
      <FullScreenMovies title='Top rated.' titleColor='#ffb37d' showRating={true} api={'https://api.themoviedb.org/3/movie/top_rated?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'}/>
      
      <motion.div id="wrapper"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
      >
          <MoviesWrapper title="POPULAR RIGHT NOW." api={'https://api.themoviedb.org/3/movie/popular?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'} showRating={true}/>
          <MoviesWrapper title="TODAY TRENDING." api={'https://api.themoviedb.org/3/trending/movie/day?api_key=' + process.env.REACT_APP_TMDB_KEY} showRating={false}/>
          <MoviesWrapper title="TOP RATED." api={'https://api.themoviedb.org/3/movie/top_rated?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'} showRating={true}/>
          <MoviesWrapper title="UPCOMING." api={'https://api.themoviedb.org/3/movie/upcoming?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'} showRating={false}/>
      </motion.div>
    </main>
  );
}

export default Homepage;