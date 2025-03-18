import { useAuth } from '../../context/Auth.context';
import ProtectedRoute from '../../components/ProtectedRoute'; // ✅ Fixed typo

const Profile = () => {
  const { user, logoutUser } = useAuth();

  return (
    <ProtectedRoute>
      <div className="p-5 mb-4 bg-dark text-white my-5 mx-4 rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">{user?.name}</h1> {/* ✅ Used optional chaining */}
          <p className="col-md-8 fs-4">Email: {user?.email}</p> {/* ✅ Used optional chaining */}
          <button onClick={logoutUser} className="btn btn-primary btn-md" type="button">
            Logout
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
