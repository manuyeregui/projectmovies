import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Tilt from 'react-vanilla-tilt';
import { motion } from 'framer-motion';

function PersonMovies(props) {

    const [personMovies, setPersonMovies] = useState([]);
    const [personJobs, setPersonJobs] = useState([]);
    const [loadingPersonMovies, setLoadingPersonMovies] = useState(true)
    const [activePage, setActivePage] = useState(0);
    const { id } = useParams();
    const { job } = useParams();



    const getPersonMovies = async () => {
        setActivePage(0)
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
        

        job === 'all' ?
            setPersonMovies([data.cast, data.crew].flat())
            :
            (job === 'actor' ?
            setPersonMovies(data.cast) :
            setPersonMovies(data.crew))

    }




    useEffect(() => {
        getPersonMovies();  
    }, [job])




    const moviesFilter =
        personMovies
            .filter(f => job === 'all' ? f : (f.job !== undefined ? (f.job.toLowerCase().split(' ').join('') === job) : f))
            .filter(f => !f.genre_ids.includes(99) && f.genre_ids.length !== 0)
            .filter((v,i,a) => a.findIndex(v2=>(v2.id===v.id))===i)
            .sort((a, b) => b.popularity - a.popularity)


    const pages = Math.floor(moviesFilter.length / 16) === (moviesFilter.length / 16) ? (moviesFilter.length / 16) : Math.floor((moviesFilter.length / 16) + 1)
    
    const pagesArray = []

    for (let i = 0; i < pages; i++) {
        pagesArray.push(i)
    }


    
    

    const Pagination = (array, number, page) => {
        return array.slice((page * number), ((page * number) + number))
    }

    const NextPage = () => {
        setActivePage(activePage + 1)
    }

    const PreviousPage = () => {
        setActivePage(activePage - 1)
    }

    return (
        <div className='personpage-movies-box'>

            <div className='job-titles'>
                <Link
                    to={'/person/' + id + '/all'}
                    className={job === 'all' ? 'job-selected all-selected' : 'job-not-selected all-not-selected'}
                    key={'all'}
                >
                All
                </Link>
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

            
            
            <div className='pages'>
                {activePage > 0 ? <p onClick={PreviousPage} className='switchpage-active'>Back</p> : <p className='switchpage-inactive'>Back</p>}
                <div>{pagesArray.map(p => p === activePage ? <p className='pagenumber-inactive'>{p + 1}</p> :<p className='pagenumber-active'>{p + 1}</p>)}</div>
                {activePage < (pages - 1) ? <p onClick={NextPage} className='switchpage-active'>Next</p> : <p className='switchpage-inactive'>Next</p>}
            </div>

            <div className='movies-grid'>
                {Pagination(moviesFilter, 16, activePage)
                    .map(movie => 
                        <Link to={'/movies/' + movie.id} key={'movie' + movie.id}>
                            {
                                movie.poster_path != null
                                ?
                                <Tilt style={{background: 'transparent', boxShadow: 'none'}} options={{}}>
                                    <motion.img 
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }} 
                                        key={movie.id}
                                        src={'https://image.tmdb.org/t/p/original' + movie.poster_path}/>
                                </Tilt>
                                :
                                <Tilt style={{background: 'transparent', boxShadow: 'none'}} options={{}}>
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
                                        className='null-poster-movie'
                                    >
                                        {movie.title}
                                    </motion.div>
                                </Tilt>
                            }
                        </Link>
                )}

            </div>

        
        </div>
    )
}

export default PersonMovies