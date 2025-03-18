import ProtectedRoute from "../../components/ProtectedRoute"; // ✅ Fixed typo
import AddTask from "./components/AddTask";
import AllTask from "./components/AllTask";

const Dashboard = () => {
    return (
        <ProtectedRoute>
            <div className="container col-sm-12"> {/* ✅ Fixed typo */}
                <div className="container py-5 px-5 col-sm-12">
                    <AddTask />
                    <AllTask />
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Dashboard;
