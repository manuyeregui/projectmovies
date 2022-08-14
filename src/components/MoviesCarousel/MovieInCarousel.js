import React, { useState, useRef } from 'react'
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';

export default function Movie(props) {

  const [isLoading, setIsLoading] = useState(true);

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
    <motion.div className='movie'>
        <img
          onLoad={changeLoading}
          onError={handleError}
          ref={image}
          loading='lazy'
          src={isLoading ? "https://image.tmdb.org/t/p/w92/" + props.poster_path : "https://image.tmdb.org/t/p/original/" + props.poster_path}
          className={isLoading ? 'poster-img loading-blur' : 'poster-img'} alt="Movie Poster"
        />
        <div className='hidden-text-box'>
          <div>
            <h2 className="movie-title">{props.title}</h2>
            {props.showRating &&
              (props.rating !== null && <div className='movie-rating'><span className="material-symbols-rounded">star</span>{props.rating.toFixed(1)}</div>)
            }
          </div>
          <Link className="movie-button" to={'/movies/' + props.id}>DETAILS</Link>
        </div>
        <Link className='mobile-movie-button' to={'/movies/' + props.id}/>
    </motion.div>
  )
}
