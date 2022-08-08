import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import avatar from '../../assets/default-avatar.jpg'

export default function Movie(props) {

  const [personName, setPersonName] = useState(0);
  const name = useRef();

  useEffect(() => {
    setPersonName(name.current.clientHeight)
  }, [])

  return (
    <motion.div className='person' style={props.personal_img === 'https://image.tmdb.org/t/p/original/null' ? {backgroundImage: `url(${avatar})`} : {backgroundImage: `url(${props.personal_img})`}}>

      <div className={personName < 30 ? 'personal-details1' : 'personal-details2'}>
        <Link to={props.actor === true ? ('/person/' + props.id + '/actor') : '/person/' + props.id + '/' + props.detail.toLowerCase().split(' ').join('')}><h6 ref={name}>{props.name}</h6></Link>
        <p>{props.detail}</p>
      </div>
      
    </motion.div>
  )
}