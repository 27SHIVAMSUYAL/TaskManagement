import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
            <h1 className="text-xl font-bold">Tasks App</h1>
            <div>
                {!token ? (
                    <>
                        <Link to="/login" className="px-4">Login</Link>
                        <Link to="/register" className="px-4">Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile" className="px-4">Profile</Link>
                        <button onClick={handleLogout} className="px-4">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
