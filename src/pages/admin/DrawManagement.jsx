import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { HiOutlinePlus, HiOutlinePlay, HiOutlineCheck } from 'react-icons/hi';

const DrawManagement = () => {
  const [draws, setDraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ drawDate: '', drawType: 'random' });
  const [simResult, setSimResult] = useState(null);

  useEffect(() => { fetchDraws(); }, []);

  const fetchDraws = async () => {
    const { data } = await API.get('/draws');
    setDraws(data.draws);
    setLoading(false);
  };

  const createDraw = async (e) => {
    e.preventDefault();
    await API.post('/draws', formData);
    setShowForm(false);
    setFormData({ drawDate: '', drawType: 'random' });
    fetchDraws();
  };

  const simulateDraw = async (id) => {
    const { data } = await API.post(`/draws/${id}/simulate`);
    setSimResult(data.preview);
    fetchDraws();
  };

  const publishDraw = async (id) => {
    if (!confirm('Publish this draw? This cannot be undone.')) return;
    await API.post(`/draws/${id}/publish`);
    setSimResult(null);
    fetchDraws();
  };

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  return (
    <div className="animate-fadeInUp">
      <div className="flex-between mb-xl">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Draw <span className="text-gradient">Management</span></h1>
          <p>Create, simulate, and publish draws</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <HiOutlinePlus /> New Draw
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)', maxWidth: '500px' }}>
          <form onSubmit={createDraw} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <div className="input-group">
              <label>Draw Date</label>
              <input type="date" className="input" value={formData.drawDate}
                onChange={(e) => setFormData({ ...formData, drawDate: e.target.value })} required />
            </div>
            <div className="input-group">
              <label>Draw Type</label>
              <select className="input" value={formData.drawType}
                onChange={(e) => setFormData({ ...formData, drawType: e.target.value })}>
                <option value="random">Random</option>
                <option value="algorithmic">Algorithmic</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Create Draw</button>
          </form>
        </div>
      )}

      {simResult && (
        <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)', borderColor: 'rgba(251, 191, 36, 0.3)' }}>
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Simulation Results</h3>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
            {simResult.winningNumbers.map((n, i) => (
              <span key={i} style={{ width: '45px', height: '45px', background: 'linear-gradient(135deg, var(--primary-700), var(--primary-800))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', border: '2px solid var(--primary-500)' }}>{n}</span>
            ))}
          </div>
          <p>5-Match Winners: {simResult.winners5} | 4-Match: {simResult.winners4} | 3-Match: {simResult.winners3}</p>
        </div>
      )}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Status</th>
              <th>Pool</th>
              <th>Numbers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {draws.map((draw) => (
              <tr key={draw._id}>
                <td>{new Date(draw.drawDate).toLocaleDateString()}</td>
                <td>{draw.drawType}</td>
                <td><span className={`badge ${draw.status === 'published' ? 'badge-success' : draw.status === 'simulated' ? 'badge-warning' : 'badge-info'}`}>{draw.status}</span></td>
                <td>₹{(draw.totalPool || 0).toLocaleString()}</td>
                <td>{draw.winningNumbers?.join(', ') || '—'}</td>
                <td style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  {draw.status === 'pending' && (
                    <button className="btn btn-outline btn-sm" onClick={() => simulateDraw(draw._id)}>
                      <HiOutlinePlay /> Simulate
                    </button>
                  )}
                  {draw.status === 'simulated' && (
                    <button className="btn btn-primary btn-sm" onClick={() => publishDraw(draw._id)}>
                      <HiOutlineCheck /> Publish
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DrawManagement;
