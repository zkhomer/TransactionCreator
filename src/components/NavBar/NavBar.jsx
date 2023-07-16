import {NavLink} from 'react-router-dom'
import './nav-bar.scss'

const NavBar = () => {
    return (
        <nav className="nav-bar">
            <ul className="nav-bar__list">
                <li>
                    <NavLink className="navLink" to='/'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink className="navLink" to='/transaction-list'>
                        Transaction List
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default NavBar
