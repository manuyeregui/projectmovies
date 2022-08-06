import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import logo from '../../assets/JustWatch-logo.png'

function Providers() {

  const { id } = useParams();

  const [services, setServices] = useState([]);

  const providers = []

  const getProviders = async () => {

    let providersRawData = await fetch('https://api.themoviedb.org/3/movie/' + id + '/watch/providers?api_key=' + process.env.REACT_APP_TMDB_KEY);
    let providersData = await providersRawData.json();

    const localProviders = []

    if (providersData.results.AR !== undefined) {
      localProviders = providersData.results.AR
    }

    if (localProviders.flatrate !== undefined) {localProviders.flatrate.forEach(f => providers.push(f.logo_path))}
    if (localProviders.rent !== undefined) {localProviders.rent.forEach(r => providers.push(r.logo_path))}
    if (localProviders.buy !== undefined) {localProviders.buy.forEach(b => providers.push(b.logo_path))}

    let newProviders = providers.filter((item, pos) => providers.indexOf(item) === pos)

    setServices(newProviders);
  }

  useEffect(() => {
    getProviders();
  }, [id])

  return (
    <div className='providers-box'>
      <a href='https://www.justwatch.com/' target='_blank' rel="noreferrer"><img src={logo} alt='' className='justwatch-logo'/></a>
      <div className='providers-img-box'>
        {services.length !== 0
          ? services.map(s => <img src={'https://image.tmdb.org/t/p/original/' + s} alt='' key={s.provider_id}/>)
          : 'No providers yet'
        }
      </div>
    </div>
  )
}

export default Providers