import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/Sidebar/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}