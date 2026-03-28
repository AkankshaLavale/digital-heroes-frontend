import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const Charity = () => {
  const { user, updateUser } = useAuth();
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(user?.charityPercentage || 10);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/charities').then(({ data }) => { setCharities(data.charities); setLoading(false); });
  }, []);

  const selectCharity = async (charityId) => {
    setSaving(true);
    try {
      const { data } = await API.put('/auth/profile', { selectedCharity: charityId, charityPercentage: percentage });
      updateUser(data.user);
      setMessage('Charity updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update');
    }
    setSaving(false);
  };

  const updatePercentage = async () => {
    setSaving(true);
    try {
      const { data } = await API.put('/auth/profile', { charityPercentage: percentage });
      updateUser(data.user);
      setMessage('Percentage updated!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update');
    }
    setSaving(false);
  };

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  return (
    <div className="animate-fadeInUp">
      <div className="page-header">
        <h1>My <span className="text-gradient">Charity</span></h1>
        <p>Choose a charity and set your contribution percentage</p>
      </div>

      {message && <div className="badge badge-success" style={{ display: 'block', padding: '0.75rem', marginBottom: 'var(--space-lg)', borderRadius: 'var(--radius-md)', textAlign: 'center', textTransform: 'none', letterSpacing: '0', fontSize: '0.9rem' }}>{message}</div>}

      {/* Contribution Percentage */}
      <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)', maxWidth: '500px' }}>
        <h3 style={{ marginBottom: 'var(--space-md)' }}>Contribution Percentage</h3>
        <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-lg)' }}>Minimum 10% of your subscription goes to charity</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <input
            type="range" min="10" max="100" value={percentage}
            onChange={(e) => setPercentage(parseInt(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--primary-500)' }}
          />
          <span style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--primary-400)', minWidth: '50px' }}>{percentage}%</span>
          <button className="btn btn-primary btn-sm" onClick={updatePercentage} disabled={saving}>Save</button>
        </div>
      </div>

      {/* Charity List */}
      <h3 style={{ marginBottom: 'var(--space-lg)' }}>Select Your Charity</h3>
      <div className="grid grid-3">
        {charities.map((charity) => (
          <div key={charity._id} className="card" style={{
            padding: 'var(--space-xl)',
            border: user?.selectedCharity?._id === charity._id || user?.selectedCharity === charity._id
              ? '2px solid var(--primary-500)' : undefined,
          }}>
            {charity.imageUrl && (
              <img src={charity.imageUrl} alt={charity.name} style={{ borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-md)', height: '120px', width: '100%', objectFit: 'cover' }} />
            )}
            {charity.featured && <span className="badge badge-accent" style={{ marginBottom: 'var(--space-sm)' }}>Featured</span>}
            <h4 style={{ marginBottom: 'var(--space-sm)' }}>{charity.name}</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: 'var(--space-md)' }}>{charity.description?.substring(0, 100)}...</p>
            <button
              className={`btn ${user?.selectedCharity?._id === charity._id || user?.selectedCharity === charity._id ? 'btn-primary' : 'btn-outline'} btn-sm`}
              onClick={() => selectCharity(charity._id)}
              disabled={saving}
              style={{ width: '100%' }}
            >
              {user?.selectedCharity?._id === charity._id || user?.selectedCharity === charity._id ? '✓ Selected' : 'Select'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charity;
