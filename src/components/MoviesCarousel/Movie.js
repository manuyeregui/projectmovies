import React from 'react'
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom'

export default function Movie(props) {
  return (
    <motion.div className='movie'>
        <img loading='lazy' src={props.poster} className='poster-img' alt="Movie Poster"/>
        <div className='hidden-text-box'>
          <Link className="movie-title" to={'/movies/' + props.id}>{props.title}</Link>
          {props.rating !== 0 ? <div className='movie-rating'><span className="material-symbols-rounded">star</span>{props.rating}</div> : null}
        </div>
    </motion.div>
  )
}
