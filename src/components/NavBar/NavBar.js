import { React } from 'react'
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import Searchbar from './SearchBar';

export default function NavBar() {
  
  return (
    <div className="nav-box">

        <div className="nav-content">
            <Link to='/' className='nav-title'>MOVIES.</Link>

            <Searchbar/>

            {/*<div className="nav-links">
              <NavLink text="ABOUT" link="https://imdb.com"/>
              <NavLink text="GITHUB" link="https://spotify.com"/>
            </div>*/}
        </div>

    </div>
  )
}
