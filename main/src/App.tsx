import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Chat from './pages/Chat/Chat';
import AdminUsers from './pages/AdminUsers/AdminUsers';
import AdminDocuments from './pages/AdminDocuments/AdminDocuments';
import DocumentTimeline from './pages/DocumentTimeline/DocumentTimeline';

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="chat" replace />} />
        <Route path="chat" element={<Chat />} />
        <Route path="admin/users" element={<AdminUsers />} />
        <Route path="admin/documents" element={<AdminDocuments />} />
        <Route path="document-timeline" element={<DocumentTimeline />} />
      </Route>
    </Routes>
  );
}

export default App;