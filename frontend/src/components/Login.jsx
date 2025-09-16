import { useState } from "react";
import { pb } from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useAuth } from "./AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({
        identity: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { identity, password } = formData;

        if (!identity || !password) {
            setError("Please fill in all fields");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const result = await login(identity, password);

            if (result.success) {
                navigate("/");
                return;
            }

            const users = await pb.collection('users').getList(1, 1, {
                filter: `username = "${identity}" || email = "${identity}"`,
                $autoCancel: false
            });

            if (users.items.length === 0) {
                throw new Error("User not found");
            }

            const fallbackResult = await login(users.items[0].email, password);
            if (fallbackResult.success) {
                navigate("/");
            } else {
                throw new Error("Invalid password");
            }
        } catch (error) {
            setError(error.message || "Invalid username or password");
        } finally {
            setLoading(false);
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
                            name="identity"
                            className="login-text"
                            type="text"
                            value={formData.identity}
                            onChange={handleChange}
                            autoFocus
                            placeholder="username"
                            disabled={loading}
                        />
                    </div>

                    <div className="login-field password-container">
                        <input
                            name="password"
                            className="login-text"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="password"
                            disabled={loading}
                        />
                        <button
                            type="button"
                            className="show-password-button"
                            onClick={() => setShowPassword(prev => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? "(⊙_⊙)" : "(ᴗ_ ᴗ。)"}
                        </button>
                    </div>
                </div>

                <div className="forgot-password">
                    <a href="/forgot-password">forgot password?</a>
                </div>

                <div className="forgot-password">
                    <a href="/register">no account yet?</a>
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
    );
};

export default Login;