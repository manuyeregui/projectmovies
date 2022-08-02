import React from 'react'
import PeopleWrapper from './PeopleWrapper'
import MoviesWrapper from '../MoviesCarousel/MoviesWrapper'

function RightColumnWrapper(props) {
  return (
    <div className='moviepage-body-right-column'>
        <div className="moviepage-title-box">
            <h2 className='moviepage-title'>{props.title}</h2>
            <p className='moviepage-metadata'>{props.release_date}</p>
            <p className='moviepage-metadata'>{props.runtime}min</p>
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

        <PeopleWrapper/>

        <MoviesWrapper title='RECOMMENDED MOVIES' api={props.recommendedMovies}/>

    </div>
  )
}

export default RightColumnWrapper