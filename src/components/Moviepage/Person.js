import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Movie(props) {

  const avatar = 'https://st4.depositphotos.com/29453910/37778/v/450/depositphotos_377785390-stock-illustration-hand-drawn-modern-man-avatar.jpg'

  const [personName, setPersonName] = useState(0);
  const name = useRef();

  useEffect(() => {
    setPersonName(name.current.clientHeight)
  }, [])

  console.log(name);
  console.log(personName);

  return (
    <motion.div className='person'>
      
      <img loading='lazy' src={props.personal_img === 'https://image.tmdb.org/t/p/original/null' ? avatar : props.personal_img} /*alt="Person"*//>

      <div className={personName < 30 ? 'personal-details1' : 'personal-details2'}>
        <Link to={props.actor === true ? ('/person/' + props.id + '/actor') : '/person/' + props.id + '/' + props.detail.toLowerCase().split(' ').join('')}><h6 ref={name}>{props.name}</h6></Link>
        <p>{props.detail}</p>
      </div>
      
    </motion.div>
  )
}