import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import avatar from '../../assets/default-avatar.jpg'

export default function Movie(props) {

  return (
    <motion.div className='person' style={props.personal_img === 'https://image.tmdb.org/t/p/w185/null' ? {backgroundImage: `url(${avatar})`} : {backgroundImage: `url(${props.personal_img})`}}>

      <div className='personal-details'>
        <Link to={props.actor === true ? ('/person/' + props.id + '/actor') : '/person/' + props.id + '/' + props.detail.toLowerCase().split(' ').join('')}>
          <h6>{props.name}</h6>
        </Link>
        <p>{props.detail}</p>
      </div>
      
    </motion.div>
  )
}