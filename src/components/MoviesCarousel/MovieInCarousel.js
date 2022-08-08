import React, { useState } from 'react'
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import avatar from '../../assets/default-avatar.jpg'

export default function Movie(props) {

  const [isLoading, setIsLoading] = useState(true);

  const changeLoading = () => {
    setIsLoading(false)
  }

  return (
    <motion.div className='movie'>
        <img
          onLoad={changeLoading}
          loading='lazy'
          src={isLoading ? "https://image.tmdb.org/t/p/w92/" + props.poster_path : "https://image.tmdb.org/t/p/original/" + props.poster_path}
          className={isLoading ? 'poster-img loading-blur' : 'poster-img'} alt="Movie Poster"
        />
        <div className='hidden-text-box'>
          <div>
            <h2 className="movie-title">{props.title}</h2>
            { props.showRating &&
              (props.rating !== null && <div className='movie-rating'><span className="material-symbols-rounded">star</span>{props.rating.toFixed(1)}</div>)
            }
          </div>
          <Link className="movie-button" to={'/movies/' + props.id}>DETAILS</Link>
        </div>
    </motion.div>
  )
}
