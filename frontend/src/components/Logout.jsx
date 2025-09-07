import {useAuth} from "./AuthContext";
import { useNavigate } from "react-router-dom";
import {useState} from "react";


const Logout = () => {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await logout();

            if (result.success) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }

    }


    return (
        <button
            className="logout-button"
            onClick={logout}

        >logout</button>
    )
}

export default Logout;
