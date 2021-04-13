import {NavLink} from "react-router-dom";

const Header = () => (
    <header>
        <h1>Issue Tracker</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create</NavLink>
    </header>
);

export default Header