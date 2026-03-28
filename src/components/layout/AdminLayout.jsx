import { NavLink, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { HiOutlineChartBar, HiOutlineUsers, HiOutlineTicket, HiOutlineHeart, HiOutlineSparkles, HiOutlineDocumentReport } from 'react-icons/hi';

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div className="layout-dashboard">
        <aside className="sidebar">
          <div className="sidebar-section">Admin Panel</div>
          <nav className="sidebar-nav">
            <NavLink to="/admin" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <HiOutlineChartBar className="icon" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/admin/users" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <HiOutlineUsers className="icon" />
              <span>Users</span>
            </NavLink>
            <NavLink to="/admin/draws" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <HiOutlineTicket className="icon" />
              <span>Draws</span>
            </NavLink>
            <NavLink to="/admin/charities" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <HiOutlineHeart className="icon" />
              <span>Charities</span>
            </NavLink>
            <NavLink to="/admin/winners" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <HiOutlineSparkles className="icon" />
              <span>Winners</span>
            </NavLink>
            <NavLink to="/admin/reports" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <HiOutlineDocumentReport className="icon" />
              <span>Reports</span>
            </NavLink>
          </nav>
        </aside>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
