import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Subscribe from './pages/Subscribe';
import CharityDirectory from './pages/CharityDirectory';
import CharityProfile from './pages/CharityProfile';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard';
import Scores from './pages/dashboard/Scores';
import Draws from './pages/dashboard/Draws';
import Charity from './pages/dashboard/Charity';
import Winnings from './pages/dashboard/Winnings';
import Settings from './pages/dashboard/Settings';
import DashboardLayout from './components/layout/DashboardLayout';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import DrawManagement from './pages/admin/DrawManagement';
import CharityManagement from './pages/admin/CharityManagement';
import WinnerManagement from './pages/admin/WinnerManagement';
import Reports from './pages/admin/Reports';
import AdminLayout from './components/layout/AdminLayout';

// Protected Route wrapper
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
  
  return children;
};

// Public Route (redirect if logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;
  if (user) return <Navigate to="/dashboard" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
      <Route path="/charities" element={<><Navbar /><CharityDirectory /><Footer /></>} />
      <Route path="/charities/:id" element={<><Navbar /><CharityProfile /><Footer /></>} />
      <Route path="/login" element={<PublicRoute><Navbar /><Login /><Footer /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Navbar /><Signup /><Footer /></PublicRoute>} />
      <Route path="/subscribe" element={<ProtectedRoute><Navbar /><Subscribe /><Footer /></ProtectedRoute>} />

      {/* User Dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="scores" element={<Scores />} />
        <Route path="draws" element={<Draws />} />
        <Route path="charity" element={<Charity />} />
        <Route path="winnings" element={<Winnings />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="draws" element={<DrawManagement />} />
        <Route path="charities" element={<CharityManagement />} />
        <Route path="winners" element={<WinnerManagement />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
