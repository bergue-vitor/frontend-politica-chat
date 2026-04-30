import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Chat from './pages/Chat/Chat';
import AdminUsers from './pages/AdminUsers/AdminUsers';
import AdminDocuments from './pages/AdminDocuments/AdminDocuments';
import AdminCatalogs from './pages/AdminCatalogs/AdminCatalogs';
import DocumentTimeline from './pages/DocumentTimeline/DocumentTimeline';
import ProfileEdit from './pages/ProfileEdit/ProfileEdit';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/login" replace />} />
        <Route
          path="chat"
          element={
            <ProtectedRoute allowedRoles={['1', '2']}>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/edit"
          element={
            <ProtectedRoute allowedRoles={['1', '2']}>
              <ProfileEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/users"
          element={
            <ProtectedRoute allowedRoles={['2']}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/documents"
          element={
            <ProtectedRoute allowedRoles={['2']}>
              <AdminDocuments />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/catalogs"
          element={
            <ProtectedRoute allowedRoles={['2']}>
              <AdminCatalogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="document-timeline"
          element={
            <ProtectedRoute allowedRoles={['2']}>
              <DocumentTimeline />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  );
}

export default App;
