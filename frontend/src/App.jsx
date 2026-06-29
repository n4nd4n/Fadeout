import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import UserDetails from './pages/UserDetails';
import EventManagement from './pages/EventManagement';
import EventDetails from './pages/EventDetails';
import StaticPagesList from './pages/StaticPagesList';
import StaticPageEdit from './pages/StaticPageEdit';
import './index.css';

import { ThemeProvider } from './providers/ThemeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/list"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <UsersList />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/deleted"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <UsersList />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/view/:id"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <UserDetails />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <EventManagement />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/events/view/:id"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <EventDetails />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/configurations/static-pages"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <StaticPagesList />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/static-pages/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <StaticPageEdit />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
