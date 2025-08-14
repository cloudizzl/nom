import {Link} from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="logo">NOM</h2>
            <ul className="nav-links">
                <li><Link className="nav-link" to="/login">Login</Link></li>
                <li><Link className="nav-link" to="/">Home</Link></li>
                <li><Link className="nav-link" to="/about">About</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
