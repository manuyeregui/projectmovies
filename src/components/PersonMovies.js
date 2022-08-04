import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Tilt from 'react-vanilla-tilt';

function PersonMovies(props) {

    const [personMovies, setPersonMovies] = useState([]);
    const [personJobs, setPersonJobs] = useState([]);
    const [loadingPersonMovies, setLoadingPersonMovies] = useState(true)
    const { id } = useParams();
    const { job } = useParams();

    

    const getPersonMovies = async () => {
        setLoadingPersonMovies(true)

        const rawData = await fetch('https://api.themoviedb.org/3/person/' + id + '/movie_credits?api_key=' + process.env.REACT_APP_TMDB_KEY +'&language=en-US');
        const data = await rawData.json();

        setLoadingPersonMovies(false)

        const personJobsArray = []

        data.crew.forEach(e => {
            if (!personJobsArray.includes(e.job) && (!e.genre_ids.includes(99) && e.genre_ids.length !== 0)) {
                personJobsArray.push(e.job)}
        });

        if (data.cast.length > 0) {personJobsArray.push('Actor')}

        setPersonJobs(personJobsArray)
        
        job === 'actor' ?
            setPersonMovies(data.cast) :
            setPersonMovies(data.crew)
    }

    useEffect(() => {
        getPersonMovies();  
    }, [/*job*/])

    return (
        <div className='personpage-movies-box'>

            <div className='job-titles'>
                {personJobs.map(j =>
                    <Link
                        to={'/person/' + id + '/' + j.toLowerCase().split(' ').join('')}
                        className={job === j.toLowerCase().split(' ').join('') ? 'job-selected' : 'job-not-selected'}
                        key={id + j}
                    >
                    {j}
                    </Link>
                )}
            </div>
            

            <div className='movies-grid'>
                {personMovies
                    .filter(f => f.job !== undefined ? (f.job.toLowerCase().split(' ').join('') === job) : f)
                    .filter(f => !f.genre_ids.includes(99) && f.genre_ids.length !== 0)
                    .sort((a, b) => b.popularity - a.popularity)
                    .map(movie => 
                        <Link to={'/movies/' + movie.id} key={'movie' + movie.id}>
                            {movie.poster_path != null
                            ?
                            <Tilt style={{background: 'transparent', boxShadow: 'none'}} options={{}}>
                                <img key={movie.id} src={'https://image.tmdb.org/t/p/original/' + movie.poster_path}/>
                            </Tilt>
                            :
                            <Tilt style={{background: 'transparent', boxShadow: 'none'}} options={{}}>
                                <div className='null-poster-movie'>{movie.title}</div>
                            </Tilt>}
                        </Link>
                )}
            </div>

        
        </div>
    )
}

export default PersonMovies