import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const CharityManagement = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', imageUrl: '', websiteUrl: '', featured: false });

  useEffect(() => { fetchCharities(); }, []);

  const fetchCharities = async () => {
    const { data } = await API.get('/charities');
    setCharities(data.charities);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await API.put(`/charities/${editingId}`, formData);
    } else {
      await API.post('/charities', formData);
    }
    resetForm();
    fetchCharities();
  };

  const handleEdit = (c) => {
    setFormData({ name: c.name, description: c.description, imageUrl: c.imageUrl, websiteUrl: c.websiteUrl, featured: c.featured });
    setEditingId(c._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this charity?')) return;
    await API.delete(`/charities/${id}`);
    fetchCharities();
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', imageUrl: '', websiteUrl: '', featured: false });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  return (
    <div className="animate-fadeInUp">
      <div className="flex-between mb-xl">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Charity <span className="text-gradient">Management</span></h1>
        </div>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          <HiOutlinePlus /> Add Charity
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)', maxWidth: '600px' }}>
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>{editingId ? 'Edit' : 'Add'} Charity</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div className="input-group">
              <label>Name</label>
              <input type="text" className="input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea className="input" rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Image URL</label>
              <input type="url" className="input" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Website URL</label>
              <input type="url" className="input" value={formData.websiteUrl} onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
              Featured charity
            </label>
            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
              <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
              <button type="button" className="btn btn-ghost" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Featured</th><th>Website</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {charities.map((c) => (
              <tr key={c._id}>
                <td style={{ fontWeight: '600' }}>{c.name}</td>
                <td>{c.featured ? <span className="badge badge-accent">Yes</span> : 'No'}</td>
                <td>{c.websiteUrl ? <a href={c.websiteUrl} target="_blank" rel="noopener" style={{ color: 'var(--primary-400)' }}>Link</a> : '—'}</td>
                <td style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(c)}><HiOutlinePencil /></button>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(c._id)} style={{ color: 'var(--error)' }}><HiOutlineTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CharityManagement;
