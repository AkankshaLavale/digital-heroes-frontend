import { NavLink, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { HiOutlineHome, HiOutlineStar, HiOutlineTicket, HiOutlineHeart, HiOutlineSparkles, HiOutlineCog } from 'react-icons/hi';

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="layout-dashboard">
        <aside className="sidebar">
          <div className="sidebar-section">Dashboard</div>
          <nav className="sidebar-nav">
            <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <HiOutlineHome className="icon" />
              <span>Overview</span>
            </NavLink>
            <NavLink to="/dashboard/scores" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <HiOutlineStar className="icon" />
              <span>My Scores</span>
            </NavLink>
            <NavLink to="/dashboard/draws" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <HiOutlineTicket className="icon" />
              <span>Draws</span>
            </NavLink>
            <NavLink to="/dashboard/charity" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <HiOutlineHeart className="icon" />
              <span>My Charity</span>
            </NavLink>
            <NavLink to="/dashboard/winnings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <HiOutlineSparkles className="icon" />
              <span>Winnings</span>
            </NavLink>

            <div className="sidebar-section" style={{ marginTop: '1.5rem' }}>Account</div>
            <NavLink to="/dashboard/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <HiOutlineCog className="icon" />
              <span>Settings</span>
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

export default DashboardLayout;
