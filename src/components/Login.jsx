import {useState} from "react";
import {pb} from "../lib/pocketbase";
import {useNavigate} from "react-router-dom";
import "../styles/login.css";

const Login = () => {
    const [identity, setIdentity] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!identity || !password) {
            setError("Please fill in all fields");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await pb.collection('users').authWithPassword(identity, password);

            navigate("/dashboard");
            console.log("Successfully logged in", identity);
        } catch (authError) {
            console.log("Direct auth failed, trying fallback...", authError);

            try {
                const users = await pb.collection('users').getList(1, 1, {
                    filter: `username = "${identity}" || email = "${identity}"`,
                    $autoCancel: false
                });

                if (users.items.length === 0) {
                    throw new Error("User not found");
                }

                const user = users.items[0];
                await pb.collection('users').authWithPassword(user.email, password);
                navigate("/dashboard");
            } catch (error) {
                console.log("Login error:", error.data);
                setError(error.data?.message || "Invalid username or password");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">login</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="login-fields">
                    <div className="login-field">
                        <input
                            className="login-text"
                            type="text"
                            value={identity}
                            onChange={(e) => setIdentity(e.target.value)}
                            autoFocus
                            placeholder="username"
                            disabled={loading}
                        />
                    </div>

                    <div className="login-field password-container">
                        <input
                            className="login-text"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            disabled={loading}
                        />
                        <button
                            className="show-password-button"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "(⊙_⊙)" : "(ᴗ_ ᴗ。)"}
                        </button>
                    </div>
                </div>

                <div className="forgot-password">
                    <a href="/forgot-password">forgot password?</a>
                </div>

                <button
                    className="login-button"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "logging in..." : "login"}
                </button>
            </form>
        </div>
    )
};

export default Login;

