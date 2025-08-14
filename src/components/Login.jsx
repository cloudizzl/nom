import {useState} from "react";
import {pb} from "../lib/pocketbase";
import {useNavigate} from "react-router-dom";
import "../styles/login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = await pb.collection('users').getFirstListItem(
                '"username="${username}"'
            );
            await pb.collection("users").authWithPassword(user.email, password);
            navigate("/dashboard");
            console.log("Successfully logged in", username);
        } catch (error) {
            setError(error.data?.message || "Login failed");
            console.log("Login error:", error.data);
        } finally {
            setLoading(false);
        }
    };

    return (
       <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="login-field">
                    <label htmlFor="username">Username</label>
                    <input
                        className="login-text"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                    />
                </div>

                <div className="login-field">
                    <label htmlFor="password">Password</label>
                    <input
                        className="login-text"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        (ō.Ô)
                    </button>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
};

export default Login;

