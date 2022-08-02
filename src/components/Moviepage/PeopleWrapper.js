import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Person from './Person'

function PeopleWrapper() {

    const { id } = useParams();

    const [cast, setCast] = useState([])
    const [crew, setCrew] = useState([])

    const getCredits = async () => {

        let rawData = await fetch('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1');
        let data = await rawData.json();

        const castData = await data.cast/*.filter(d => ( d.popularity > 2))*/;
        const crewData = await data.crew.filter(d =>
            d.department === 'Directing' ||
            d.department === 'Writing' ||
            d.department === 'Visual Effects' ||
            d.department === 'Art' ||
            d.job === 'Tranks' ||
            d.job === 'Producer' ||
            d.job === 'Executive Producer'
        );

        setCast(castData)
        setCrew(crewData)
    }

    useEffect(() => {
        getCredits();
    }, [])

    const [castCarouselWidth, setCastCarouselWidth] = useState(null);
    const castCarousel = useRef();

    useEffect(() => {

        setCastCarouselWidth(castCarousel.current.scrollWidth - castCarousel.current.offsetWidth + 10)
        setCrewCarouselWidth(crewCarousel.current.scrollWidth - crewCarousel.current.offsetWidth + 10)

    }, [cast, crew])

    const [crewCarouselWidth, setCrewCarouselWidth] = useState(null);
    const crewCarousel = useRef();

    /*useEffect(() => {

        setCrewCarouselWidth(crewCarousel.current.scrollWidth - crewCarousel.current.offsetWidth + 10)

    }, [crew])*/

    return (
        <div>
            <h2 className='moviepage-detail-title'>CAST</h2>
            <motion.div className='people-box' ref={castCarousel}>
                <motion.div className='inner-people-box' drag="x" dragConstraints={{right: 0, left: -castCarouselWidth}}>
                    {cast.map (m => <Person name={m.name} character={m.character} personal_img={"https://image.tmdb.org/t/p/original/" + m.profile_path} key={'cast' + m.character + m.id}/>)}
                </motion.div>
            </motion.div>

            <h2 className='moviepage-detail-title'>CREW</h2>
            <motion.div className='people-box' ref={crewCarousel}>
                <motion.div className='inner-people-box' drag="x" dragConstraints={{right: 0, left: -crewCarouselWidth}}>
                    {crew.map (m => <Person name={m.name} job={m.job} department={m.department} personal_img={"https://image.tmdb.org/t/p/original/" + m.profile_path} key={'crew' + m.job + m.id}/>)}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default PeopleWrapper