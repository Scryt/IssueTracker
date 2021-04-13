import {NavLink} from "react-router-dom";
import style from './Header.module.scss'

const Header = () => (
    <header>
        <h1>Issue Tracker</h1>
        <div className={style.navBar}>
            <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
            <NavLink to="/create" activeClassName="is-active">Create</NavLink>
        </div>
    </header>
);

export default Header