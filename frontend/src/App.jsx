import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeeDetails from './pages/EmployeeDetails';
import Departments from './pages/Departments';
import Notices from './pages/Notices';
import Settings from './pages/Settings';

import EmployeeDashboard from './pages/EmployeeDashboard';
import MyProfile from './pages/MyProfile';
import EmployeeNotices from './pages/EmployeeNotices';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Admin-only routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/add"
          element={
            <ProtectedRoute requiredRole="admin">
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/edit/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <EditEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <EmployeeDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute requiredRole="admin">
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments"
          element={
            <ProtectedRoute requiredRole="admin">
              <Departments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notices"
          element={
            <ProtectedRoute requiredRole="admin">
              <Notices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute requiredRole="admin">
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Employee-only routes */}
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute requiredRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute requiredRole="employee">
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-notices"
          element={
            <ProtectedRoute requiredRole="employee">
              <EmployeeNotices />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;