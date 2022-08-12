import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import MovieInGrid from './MovieInGrid';

function PersonMovies() {

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
        <div className='personpage-right-column'>

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
                <div>
                    {pagesArray
                        .slice((activePage <= 4 ? 0 : (activePage >= pages - 4 ? (pages - 9 >= 0 ? pages - 9 : 0) : activePage - 4)), (activePage <= 4 ? 9 : activePage + 5))
                        .map(
                            p => p === activePage
                                ? <p className='pagenumber-active' key={p}>{p + 1}</p>
                                : <p className='pagenumber-inactive' key={p}>{p + 1}</p>)
                    }
                    {/*(activePage < pages - 6) ? <p className='pagenumber-inactive'>...{pages}</p> : (activePage === pages - 6 && <p className='pagenumber-inactive'>{pages}</p>)*/}
                </div>
                {activePage < (pages - 1) ? <p onClick={NextPage} className='switchpage-active'>Next</p> : <p className='switchpage-inactive'>Next</p>}
            </div>

            <div className='movies-grid'>
                {Pagination(moviesFilter, 16, activePage)
                    .map(movie => 
                        <MovieInGrid id={movie.id} poster_path={movie.poster_path} title={movie.title} key={movie.id}/>
                )}

            </div>

        
        </div>
    )
}

export default PersonMovies