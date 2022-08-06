import React from 'react';
import Tilt from 'react-vanilla-tilt';
import Providers from './Providers';

function LeftColumnWrapper(props) {
  return (
    <div className={props.backdrop ? 'moviepage-body-left-column' : 'moviepage-body-left-column-nobackdrop'}>
        { props.poster_path !== null &&
          <Tilt style={{background: 'transparent', boxShadow: 'none'}} options={{}}>
              <img className='moviepage-poster' src={"https://image.tmdb.org/t/p/original/" + props.poster_path} alt='movie poster'/>
          </Tilt>
        }
        {props.tagline && <h2 className='moviepage-tagline'>{props.tagline}</h2>}
        
        
        <h3 className={
            props.vote_average >= 8 ? 'good-rating' :
            (props.vote_average < 8 && props.vote_average >= 5.5 ? 'regular-rating' : 'bad-rating')}><span className="material-symbols-rounded">star</span>{props.vote_average}
        </h3>
        <p>based on {props.vote_count} votes</p>

        <Providers/>
    </div>
  )
}

export default LeftColumnWrapper