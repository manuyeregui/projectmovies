import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReadMore from '../ReadMore'
import Tilt from 'react-vanilla-tilt';

function PersonData() {

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
        <div>
            {(personData.profile_path !== null && personData.profile_path !== undefined) &&
                <Tilt style={{background: 'transparent', boxShadow: 'none'}} options={{}}>
                    {<img loading='lazy' src={'https://image.tmdb.org/t/p/original/' + personData.profile_path} alt=''/>}
                </Tilt>
            }

            <h2>{personData.name}</h2>
            <h3>{personData.known_for_department}</h3>

            {personData.birthday !== null &&
                (
                    personData.deathday !== null ?
                    <div>
                        <p>born: <strong>{personData.birthday}</strong></p>
                        <p>died: <strong>{personData.deathday + ' (age ' + getDeath(personData.birthday, personData.deathday) + ')'}</strong></p>
                    </div>
                    :
                        <p>{personData.birthday + ' (' + getAge(personData.birthday) + ' years old)'}</p>
                )
            
            }

            {
            (personData.biography !== undefined && personData.biography !== '') &&
                <ReadMore limit={300} text={personData.biography}/>
            }
        </div>
    )
}

export default PersonData