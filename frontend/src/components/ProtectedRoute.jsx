import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.role !== requiredRole) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;