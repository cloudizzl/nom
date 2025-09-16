import {useState} from "react";
import {pb} from "../lib/pocketbase";
import {Link, useNavigate} from "react-router-dom";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!email || !username || !password) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (password !== passwordConfirm) {
            setError("Passwords don't match");
            setIsLoading(false);
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            setIsLoading(false);
            return;
        }

        try {
            await pb.collection("users").create({
                email,
                username,
                password,
                passwordConfirm,
            });

            alert("User successfully created!");
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">register</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="login-fields">
                    <div className="login-field">
                        <input
                            className="login-text"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="login-field">
                        <input
                            className="login-text"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="login-field password-container">
                        <input
                            className="login-text"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="login-field password-container">
                        <input
                            className="login-text"
                            type={showPassword ? 'text' : 'password'}
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            placeholder="confirm password"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="forgot-password">
                        <Link to="/login">already have an account?</Link>
                    </div>

                    <button
                        className="show-password-button"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "(⊙_⊙)" : "(ᴗ_ ᴗ。)"}
                    </button>
                </div>

                <button
                    className="login-button"
                    type="submit"
                >
                    register
                </button>
            </form>
        </div>
    )
}

export default Registration;