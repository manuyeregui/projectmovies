import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Person from './Person'

function PeopleWrapper(props) {

    const [cast, setCast] = useState([])
    const [crew, setCrew] = useState([])

    const getCredits = async () => {

        let rawData = await fetch(props.api);
        let data = await rawData.json();

        const castData = await data.cast
            .filter(d => ( d.character !== ''));

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

    return (
        <div>
            <motion.div className='people-box' ref={castCarousel}>
                {cast.length !== 0 ?<h2 className='moviepage-detail-title'>CAST</h2> : <h2 className='moviepage-detail-title'>No Cast data yet...</h2>}
                <motion.div className='inner-people-box' drag="x" dragConstraints={{right: 0, left: -castCarouselWidth}}>
                    {cast.map (m => <Person id={m.id} name={m.name} detail={m.character ? m.character : m.job} actor={m.character ? true : false} personal_img={"https://image.tmdb.org/t/p/w185/" + m.profile_path} key={'cast' + m.character + m.id}/>)}
                </motion.div>
            </motion.div>
            
            <motion.div className='people-box' ref={crewCarousel}>
                <h2 className='moviepage-detail-title'>CREW</h2>
                <motion.div className='inner-people-box' drag="x" dragConstraints={{right: 0, left: -crewCarouselWidth}}>
                    {crew.map (m => <Person id={m.id} name={m.name} detail={m.character ? m.character : m.job} actor={m.character ? true : false} personal_img={"https://image.tmdb.org/t/p/w185/" + m.profile_path} key={'crew' + m.job + m.id}/>)}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default PeopleWrapper