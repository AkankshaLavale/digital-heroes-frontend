import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineMail, HiOutlineLockClosed, HiArrowRight } from 'react-icons/hi';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div className="container container-sm">
        <div className="card" style={{ padding: 'var(--space-2xl)' }}>
          <div className="text-center mb-2xl">
            <h2>Welcome <span className="text-gradient">Back</span></h2>
            <p>Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="badge badge-error" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', marginBottom: 'var(--space-lg)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', textTransform: 'none', letterSpacing: '0' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
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

            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
              {loading ? <span className="spinner" style={{ width: '20px', height: '20px' }}></span> : <>Sign In <HiArrowRight /></>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
            Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-400)', fontWeight: '600' }}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
