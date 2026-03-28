import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';

const Settings = () => {
  const { user, updateUser, logout } = useAuth();
  const [formData, setFormData] = useState({ fullName: user?.fullName || '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [sub, setSub] = useState(null);
  const [subLoading, setSubLoading] = useState(true);

  useState(() => {
    API.get('/subscriptions/status').then(({ data }) => { setSub(data); setSubLoading(false); }).catch(() => setSubLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await API.put('/auth/profile', formData);
      updateUser(data.user);
      setMessage('Profile updated!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update');
    }
    setSaving(false);
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return;
    try {
      await API.post('/subscriptions/cancel');
      API.get('/subscriptions/status').then(({ data }) => setSub(data));
      setMessage('Subscription cancelled');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to cancel');
    }
  };

  return (
    <div className="animate-fadeInUp">
      <div className="page-header">
        <h1><span className="text-gradient">Settings</span></h1>
        <p>Manage your profile and subscription</p>
      </div>

      {message && <div className="badge badge-success" style={{ display: 'block', padding: '0.75rem', marginBottom: 'var(--space-lg)', borderRadius: 'var(--radius-md)', textAlign: 'center', textTransform: 'none', letterSpacing: '0', fontSize: '0.9rem' }}>{message}</div>}

      {/* Profile */}
      <div className="card" style={{ padding: 'var(--space-xl)', maxWidth: '500px', marginBottom: 'var(--space-2xl)' }}>
        <h3 style={{ marginBottom: 'var(--space-lg)' }}>Profile</h3>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" className="input" value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" className="input" value={user?.email} disabled style={{ opacity: 0.6 }} />
          </div>
          <div className="input-group">
            <label>Role</label>
            <input type="text" className="input" value={user?.role} disabled style={{ opacity: 0.6 }} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Subscription */}
      <div className="card" style={{ padding: 'var(--space-xl)', maxWidth: '500px', marginBottom: 'var(--space-2xl)' }}>
        <h3 style={{ marginBottom: 'var(--space-lg)' }}>Subscription</h3>
        {subLoading ? (
          <div className="spinner"></div>
        ) : sub?.isActive ? (
          <>
            <div className="flex-between" style={{ marginBottom: 'var(--space-md)' }}>
              <span>Status</span>
              <span className="badge badge-success">Active</span>
            </div>
            <div className="flex-between" style={{ marginBottom: 'var(--space-md)' }}>
              <span>Plan</span>
              <span>{sub.subscription?.planType}</span>
            </div>
            <button className="btn btn-outline" onClick={handleCancel} style={{ color: 'var(--error)', borderColor: 'var(--error)', marginTop: 'var(--space-md)' }}>
              Cancel Subscription
            </button>
          </>
        ) : (
          <p>No active subscription. <a href="/subscribe" style={{ color: 'var(--primary-400)' }}>Subscribe now</a></p>
        )}
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ padding: 'var(--space-xl)', maxWidth: '500px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
        <h3 style={{ color: 'var(--error)', marginBottom: 'var(--space-lg)' }}>Danger Zone</h3>
        <button className="btn btn-outline" onClick={logout} style={{ color: 'var(--error)', borderColor: 'var(--error)' }}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
