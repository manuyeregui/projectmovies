import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import avatar from '../../assets/default-avatar.jpg'

function SearchBar() {

    const [data, setData] = useState([]);

    const [inputState, setInputState] = useState(null);
  
    const getData = async () => {
  
      /*let searchData = []
  
      let moviesRawData = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&query=' + inputState + '&page=1&include_adult=false');
      let moviesData = await moviesRawData.json();
  
      let peopleRawData = await fetch('https://api.themoviedb.org/3/search/person?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&query=' + inputState + '&page=1&include_adult=false');
      let peopleData = await peopleRawData.json();
      
      moviesData.results.forEach(e => searchData.length <= 10 && searchData.push(e));
      peopleData.results.forEach(e => searchData.length <= 15 && searchData.push(e));*/

      let moviesRawData = await fetch('https://api.themoviedb.org/3/search/multi?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&query=' + inputState + '&page=1&include_adult=false');
      let searchData = await moviesRawData.json();
  
      searchData = searchData.results
        //.filter(f => f.popularity > 2)
        .sort((a, b) => b.popularity - a.popularity)
        .filter(f => f.media_type !== 'tv')
      setData(searchData);
    }

    
  
    useEffect(() => {
      if (inputState !== (null || '')) {
        getData();
      }
    }, [inputState])
  
    const handleChange = (e) => {
      setInputState(e.target.value);
    }
  
    const focusOut = (e) => {
      setTimeout(() => {
        setInputState(e.target.value = '');
        setData([])
      }, 100);
    }

    return (
        <div className='searchbar-box'>
                <div className='searchbar-inner-box'>
                    <input type='text' className='input' onChange={handleChange} onBlur={focusOut}/>
                    <span className="material-symbols-rounded">search</span>
                </div>

                <div className={(inputState !== '' && inputState !== null) ? 'results-box' : 'display-none'}>

                    {data !== undefined &&
                    data.map(m => 

                      <Link to={m.title !== undefined ? ('/movies/' + m.id) : ('/person/' + m.id + '/all')} key={m.id}>
                        <div className='results-inner-box'>

                          {m.media_type === 'person' &&

                            <div className='results-inner-box'>
                          
                              <img 
                                alt='' 
                                src={
                                  m.profile_path !== null
                                    ? "https://image.tmdb.org/t/p/w185" + m.profile_path
                                    : avatar
                                }
                              />

                              <div>
                                <h4>{m.name}</h4>
                                <p>{m.known_for_department}</p>
                                <p>
                                    {m.known_for
                                      .filter(mov => mov.title !== undefined)
                                      .map(mov => (m.known_for.filter(mov => mov.title !== undefined).indexOf(mov) + 1) === m.known_for.filter(mov => mov.title !== undefined).length ? mov.title : mov.title + ', ')
                                    }
                                </p>
                              </div>

                            </div>                          
                          }

                          {m.media_type === 'movie' &&

                            <div className='results-inner-box'>
                              <img 
                                alt='' 
                                src={
                                      m.poster_path !== undefined
                                        ? "https://image.tmdb.org/t/p/w92" + m.poster_path
                                        : avatar
                                }
                              />
                              
                              <div>
                                <h4>{m.title}</h4>
                                <p>
                                  {m.release_date &&
                                    m.release_date.substring(0, 4)
                                  }
                                </p>
                                  {m.vote_average > 0 &&
                                    <p className='movie-rating'><span className='material-symbols-rounded'>star</span>{m.vote_average}</p>
                                  }
                              </div>

                            </div>
                          }
                          
                            {/*<img 
                              alt='' 
                              src={
                                    m.profile_path !== undefined
                                      ? (m.profile_path !== null && ("https://image.tmdb.org/t/p/original" + m.profile_path))
                                      : (m.poster_path !== null && ("https://image.tmdb.org/t/p/original" + m.poster_path))
                                  }
                            />
                          
                            <div>
                              <h4>{m.name !== undefined ? m.name : m.title}</h4>
                              <p>
                                {
                                  m.known_for_department !== undefined
                                    ? m.known_for_department
                                    : (m.release_date && m.release_date.substring(0, 4))
                                }
                              </p>
                              
                              {m.known_for !== undefined ?

                                  <p>
                                    {m.known_for
                                      .filter(mov => mov.title !== undefined)
                                      .map(mov => (m.known_for.filter(mov => mov.title !== undefined).indexOf(mov) + 1) === m.known_for.filter(mov => mov.title !== undefined).length ? mov.title : mov.title + ', ')}
                                  </p>

                                  :

                                  (m.vote_average > 0 &&
                                    <p className='movie-rating'><span className='material-symbols-rounded'>star</span>{m.vote_average}</p>)
                              }
                              
                            </div>*/}
                        </div>
                      </Link>
                        
                    )}
                    
                </div>
                </div>
    )
}

export default SearchBar