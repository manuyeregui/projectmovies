import React from 'react'
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom'

export default function Movie(props) {
  return (
    <motion.div className='movie'>
        <img loading='lazy' src={props.poster} className='poster-img' alt="Movie Poster"/>
        <div className='hidden-text-box'>
          <div>
            <h2 className="movie-title">{props.title}</h2>
            {props.rating !== 0 ? <div className='movie-rating'><span className="material-symbols-rounded">star</span>{props.rating.toFixed(1)}</div> : null}
          </div>
          <Link className="movie-button" to={'/movies/' + props.id}>DETAILS</Link>
        </div>
    </motion.div>
  )
}
