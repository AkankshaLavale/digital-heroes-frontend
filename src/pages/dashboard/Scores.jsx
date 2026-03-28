import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi';

const Scores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ score: '', playedDate: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { fetchScores(); }, []);

  const fetchScores = async () => {
    const { data } = await API.get('/scores');
    setScores(data.scores);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await API.put(`/scores/${editingId}`, formData);
      } else {
        await API.post('/scores', formData);
      }
      setFormData({ score: '', playedDate: '' });
      setShowForm(false);
      setEditingId(null);
      fetchScores();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save score');
    }
  };

  const handleEdit = (score) => {
    setFormData({ score: score.score, playedDate: score.playedDate.split('T')[0] });
    setEditingId(score._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this score?')) return;
    await API.delete(`/scores/${id}`);
    fetchScores();
  };

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  return (
    <div className="animate-fadeInUp">
      <div className="flex-between mb-xl">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>My <span className="text-gradient">Scores</span></h1>
          <p>Manage your latest 5 Stableford golf scores</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ score: '', playedDate: '' }); }}>
          <HiOutlinePlus /> Add Score
        </button>
      </div>

      {/* Score slots */}
      <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap' }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const s = scores[i];
          return (
            <div key={i} className="card" style={{
              flex: '1 1 150px', minWidth: '150px', textAlign: 'center',
              padding: 'var(--space-xl)',
              border: s ? '1px solid rgba(16, 185, 129, 0.2)' : '1px dashed var(--surface-border)',
              background: s ? 'var(--bg-card)' : 'var(--bg-glass)',
            }}>
              {s ? (
                <>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', fontFamily: 'var(--font-display)', color: 'var(--primary-400)' }}>
                    {s.score}
                  </div>
                  <p style={{ fontSize: '0.8rem', marginTop: 'var(--space-sm)' }}>
                    {new Date(s.playedDate).toLocaleDateString()}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(s)}><HiOutlinePencil /></button>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(s._id)} style={{ color: 'var(--error)' }}><HiOutlineTrash /></button>
                  </div>
                </>
              ) : (
                <div style={{ color: 'var(--text-muted)', padding: 'var(--space-lg) 0' }}>
                  <p>Slot {i + 1}</p>
                  <p style={{ fontSize: '0.8rem' }}>Empty</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>
        💡 Only your latest 5 scores are kept. Adding a 6th score automatically replaces the oldest.
      </p>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card" style={{ maxWidth: '500px', padding: 'var(--space-xl)' }}>
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>{editingId ? 'Edit Score' : 'Add New Score'}</h3>
          {error && <p style={{ color: 'var(--error)', marginBottom: 'var(--space-md)' }}>{error}</p>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <div className="input-group">
              <label>Score (1-45 Stableford)</label>
              <input type="number" className="input" min="1" max="45" placeholder="e.g. 38"
                value={formData.score} onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) })} required />
            </div>
            <div className="input-group">
              <label>Date Played</label>
              <input type="date" className="input"
                value={formData.playedDate} onChange={(e) => setFormData({ ...formData, playedDate: e.target.value })} required />
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
              <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add Score'}</button>
              <button type="button" className="btn btn-ghost" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Scores;
