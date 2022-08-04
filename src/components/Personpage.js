import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PersonMovies from './PersonMovies';
import Tilt from 'react-vanilla-tilt';

function Personpage() {

    const { id } = useParams();

    const [personData, setPersonData] = useState([]);
    const [loadingPersonData, setLoadingPersonData] = useState(true)

    const getPersonData  = async () => {
        const rawData = await fetch('https://api.themoviedb.org/3/person/' + id + '?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US');
        const data = await rawData.json();

        setLoadingPersonData(false)
        
        setPersonData(data)
    }

    useEffect(() => {
        getPersonData();
    }, [id])

    function getAge(dateString) {
        var ageInMilliseconds = new Date() - new Date(dateString);
        return Math.floor(ageInMilliseconds/1000/60/60/24/365); // convert to years
    }

    function getDeath(birthday, deathday) { // birthday is a date
        let years = new Date(new Date(deathday) - new Date(birthday)).getFullYear() - 1970
        return years
    }

    return (
        <motion.div id="wrapper"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x:-100, transition: {duration: 0.2} }}
        >
            <div className='personpage-box'>
                <div className='personal-data-box'>
                    <div className='personpage-left-column'>
                        <Tilt style={{background: 'transparent', boxShadow: 'none'}} options={{}}>
                            <img loading='lazy' src={'https://image.tmdb.org/t/p/original/' + personData.profile_path} alt=''/>
                        </Tilt>

                        {personData.birthday !== null ?
                            (
                                personData.deathday !== null ?
                                <div>
                                    <p>born: <strong>{personData.birthday}</strong></p>
                                    <p>died: <strong>{personData.deathday + ' (age ' + getDeath(personData.birthday, personData.deathday) + ')'}</strong></p>
                                </div>
                                :
                                    <p>{personData.birthday + ' (' + getAge(personData.birthday) + ' years old)'}</p>
                            )
                        : null
                        }

                        <h2>{personData.name}</h2>
                        <h3>{personData.known_for_department}</h3>
                        <p>{personData.biography}</p>

                    </div>
                    <div className='personpage-right-column'>
                        <PersonMovies/>
                    </div>
                </div>

                

            </div>
        </motion.div>
    )
}

export default Personpage