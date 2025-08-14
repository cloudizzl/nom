import {useState} from "react";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await pb.collection("users").create({
                email,
                username,
                password,
                passwordConfirm: password,
            });
            alert("User successfully created!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="registration">
            <form onSubmit={handleSubmit}>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                />

                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                />

                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}

                <button
                    className="login-button"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default Registration;