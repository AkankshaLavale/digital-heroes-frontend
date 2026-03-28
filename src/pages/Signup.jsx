import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiArrowRight } from 'react-icons/hi';

const Signup = () => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await signup(formData.fullName, formData.email, formData.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div className="container container-sm">
        <div className="card" style={{ padding: 'var(--space-2xl)' }}>
          <div className="text-center mb-2xl">
            <h2>Join <span className="text-gradient">GolfCharity</span></h2>
            <p>Create your account and start making a difference</p>
          </div>

          {error && (
            <div className="badge badge-error" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', marginBottom: 'var(--space-lg)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', textTransform: 'none', letterSpacing: '0' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <div className="input-group">
              <label><HiOutlineUser style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Full Name</label>
              <input
                type="text"
                className="input"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label><HiOutlineMail style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Email</label>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label><HiOutlineLockClosed style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Password</label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label><HiOutlineLockClosed style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Confirm Password</label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
              {loading ? <span className="spinner" style={{ width: '20px', height: '20px' }}></span> : <>Create Account <HiArrowRight /></>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary-400)', fontWeight: '600' }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
