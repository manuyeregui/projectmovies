import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import NavLink from './NavLink';

export default function NavBar() {

  const [data, setData] = useState([]);

  const [inputState, setInputState] = useState(null);

  const getData = async () => {

    let searchData = []

    let moviesRawData = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&query=' + inputState + '&page=1&include_adult=false');
    let moviesData = await moviesRawData.json();

    let peopleRawData = await fetch('https://api.themoviedb.org/3/search/person?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&query=' + inputState + '&page=1&include_adult=false');
    let peopleData = await peopleRawData.json();

    moviesData.results.forEach(e => searchData.push(e));
    peopleData.results.forEach(e => searchData.push(e));

    setData(searchData);
  }

  useEffect(() => {
    if (inputState != (null || '')) {
      getData();
    }
  }, [inputState])

  const handleChange = (e) => {
    setInputState(e.target.value);
  }

  const focusOut = (e) => {
    setTimeout(() => {
      setInputState(e.target.value = '');
    }, 100);
  }

  return (
    <div className="nav-box">

        <div className="nav-content">
            <Link to='/' className='nav-title'>MOVIES.</Link>

            <div className='searchbar-box'>
              <div className='searchbar-inner-box'>
                <input type='text' className='input' onChange={handleChange} onBlur={focusOut}/>
                <span className="material-symbols-rounded">search</span>
              </div>

              <div className={inputState !== '' ? 'results-box' : 'display-none'}>

                {data !== undefined ?
                  data
                    .filter(f => f.popularity > 5)
                    .sort((a, b) => b.popularity - a.popularity)
                    .map(m => 

                        <Link to={m.title !== undefined ? ('/movies/' + m.id) : '/'} key={m.id}>
                          <div className='results-inner-box'>
                            <img alt='' src={m.profile_path !== undefined ? ("https://image.tmdb.org/t/p/original/" + m.profile_path) : ("https://image.tmdb.org/t/p/original/" + m.poster_path)}/>
                            <div>
                              <h4>{m.name !== undefined ? m.name : m.title}</h4>
                              <p>{m.known_for_department !== undefined ? m.known_for_department : m.release_date.substring(0, 4)}</p>
                              <p className={m.known_for !== undefined ? null : 'display-none'}>
                              {m.known_for !== undefined ?
                                m.known_for
                                  .filter(mov => mov.title !== undefined)
                                  .map(mov => (m.known_for.filter(mov => mov.title !== undefined).indexOf(mov) + 1) === m.known_for.filter(mov => mov.title !== undefined).length ? mov.title : mov.title + ', ')
                                : null}
                              </p>
                            </div>
                          </div>
                        </Link>
                      
                      )

                : null}
                
              </div>
            </div>

            {/*<div className="nav-links">
              <NavLink text="ABOUT" link="https://imdb.com"/>
              <NavLink text="GITHUB" link="https://spotify.com"/>
            </div>*/}
        </div>

    </div>
  )
}
