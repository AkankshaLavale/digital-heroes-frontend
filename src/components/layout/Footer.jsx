import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="navbar-logo" style={{ marginBottom: '0.5rem' }}>
              <span className="logo-icon">⛳</span>
              <span className="text-gradient">GolfCharity</span>
            </Link>
            <p>Subscribe. Play. Give. Win. A premium golf platform where your passion drives charitable impact.</p>
          </div>
          
          <div className="footer-col">
            <h4>Platform</h4>
            <Link to="/">Home</Link>
            <Link to="/charities">Charities</Link>
            <Link to="/subscribe">Subscribe</Link>
          </div>

          <div className="footer-col">
            <h4>Account</h4>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard/scores">My Scores</Link>
            <Link to="/dashboard/draws">Draws</Link>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GolfCharity. All rights reserved.</p>
          <p>Made with 💚 for charity</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
