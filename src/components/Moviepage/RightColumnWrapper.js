import React from 'react'
import PeopleWrapper from './PeopleWrapper'
import MoviesWrapper from '../MoviesCarousel/MoviesWrapper'
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function RightColumnWrapper(props) {

    const { id } = useParams();

  return (
    <div className='moviepage-body-right-column'>
        <div className="moviepage-title-box">
            <motion.h2 
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x:-200, transition: {duration: 0.2} }} 
                className='moviepage-title'
            >
                {props.title}
            </motion.h2>

            <p className='moviepage-metadata'>{props.release_date.substring(0, 4)}</p>

            {(props.runtime !== 0) && <p className='moviepage-metadata'>{props.runtime}min</p>}
        </div>

        <div className='moviepage-overview'>{props.overview}</div>

        <div className='moviepage-details'>
            <div className='moviepage-detail-box'>
                <p className='moviepage-detail-title'>GENRES</p>
                <p className='moviepage-detail-content'>{props.genres.map(gen => (props.genres.indexOf(gen) + 1) === props.genres.length ? gen.name : gen.name + ', ')}</p>
            </div>

            <div className='moviepage-detail-box'>
                <p className='moviepage-detail-title'>PRODUCTION COMPANIES</p>
                <p className='moviepage-detail-content'>{props.production_companies.map(com => (props.production_companies.indexOf(com) + 1) === props.production_companies.length ? com.name : com.name + ', ')}</p>
            </div>

            <div className='moviepage-detail-box'>
                <p className='moviepage-detail-title'>PRODUCTION COUNTRIES</p>
                <p className='moviepage-detail-content'>{props.production_countries.map(cou => (props.production_countries.indexOf(cou) + 1) === props.production_countries.length ? cou.name : cou.name + ', ')}</p>
            </div>

            <div className='moviepage-detail-box'>
                <p className='moviepage-detail-title'>SPOKEN LANGUAGES</p>
                <p className='moviepage-detail-content'>{props.spoken_languages.map(lan => (props.spoken_languages.indexOf(lan) + 1) === props.spoken_languages.length ? lan.english_name : lan.english_name + ', ')}</p>
            </div>
        </div>

        <PeopleWrapper api={'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'}/>

        <MoviesWrapper title='RECOMMENDED MOVIES' api={props.recommendedMovies} showRating={true}/>

    </div>
  )
}

export default RightColumnWrapper