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
import EmailNotificationsList from './pages/EmailNotificationsList';
import EmailNotificationEdit from './pages/EmailNotificationEdit';
import SystemNotificationsList from './pages/SystemNotificationsList';
import SystemNotificationEdit from './pages/SystemNotificationEdit';
import PushNotificationsList from './pages/PushNotificationsList';
import PushNotificationEdit from './pages/PushNotificationEdit';
import SystemSettings from './pages/SystemSettings';
import Sitemap from './pages/Sitemap';
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
            <Route
              path="/configurations/email-notifications"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <EmailNotificationsList />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/configurations/email-notifications/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <EmailNotificationEdit />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/configurations/system-notifications"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <SystemNotificationsList />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/configurations/system-notifications/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <SystemNotificationEdit />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/configurations/push-notifications"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <PushNotificationsList />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/configurations/push-notifications/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <PushNotificationEdit />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/configurations/system-settings"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <SystemSettings />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sitemap"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Sitemap />
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
