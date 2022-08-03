import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

const NavLink = (props) => {

    const isLogged = useSelector((state) => state.user.isLogged)
    const globalState = useSelector((state) => state)

    return (
        //<a href={props.link}>{isLogged ? 'Estas logueado' : props.text}</a>
        <Link className="nav-link" to={props.link}>{props.text}</Link>
    )

}

export default NavLink;