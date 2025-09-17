import {Link} from "react-router-dom";
import "../styles/navbar.css";
import Logout from "./Logout";
import {useAuth} from "./AuthContext";

function Navbar() {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return (
            <nav className="navbar">
                <Link className="logo-link" to="/">
                    <h2 className="logo">NOM</h2>
                </Link>
                <ul className="nav-links">
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/about">About</Link>
                    <Link className="nav-link" to="/timeline">Timeline</Link>
                </ul>
            </nav>
        );
    }

    return (
        <nav className="navbar">
            <Link className="logo-link" to="/">
                <h2 className="logo">NOM</h2>
            </Link>
            <ul className="nav-links">
                <li><Link className="nav-link" to="/">Home</Link></li>
                <li><Link className="nav-link" to="/about">About</Link></li>
                <li><Link className="nav-link" to="/timeline">Timeline</Link></li>
            </ul>
            <Logout />
        </nav>
    );
}

export default Navbar;
