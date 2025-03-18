import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            
            if (!response.ok) throw new Error(data.message || "Login failed");

            // Store token securely
            localStorage.setItem("token", data.token);

            // Redirect to profile
            navigate("/profile");

        } catch (err) {
            console.error("Login Error:", err.message);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="w-full max-w-md p-6 bg-white/20 backdrop-blur-md shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-white text-center mb-4">Login</h2>

                {error && (
                    <p className="bg-red-100 text-red-700 p-2 text-center rounded mb-4">
                        {error}
                    </p>
                )}

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <input
                            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white border border-white/40 focus:border-white outline-none focus:ring-2 focus:ring-white/60 placeholder-white/80 transition-all"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <input
                            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white border border-white/40 focus:border-white outline-none focus:ring-2 focus:ring-white/60 placeholder-white/80 transition-all"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className={`w-full flex justify-center items-center py-2 text-lg rounded-lg font-semibold transition-all
                            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white"}
                        `}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="animate-spin h-5 w-5 border-t-2 border-white"></span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
