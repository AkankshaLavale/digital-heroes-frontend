import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { HiOutlineCheck, HiOutlineX, HiOutlineCash } from 'react-icons/hi';

const WinnerManagement = () => {
  const [winners, setWinners] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchWinners(); }, [filter]);

  const fetchWinners = async () => {
    const params = {};
    if (filter) params.status = filter;
    const { data } = await API.get('/winners/all', { params });
    setWinners(data.winners);
    setLoading(false);
  };

  const handleVerify = async (id, status) => {
    await API.put(`/winners/${id}/verify`, { verificationStatus: status });
    fetchWinners();
  };

  const handlePayout = async (id) => {
    await API.put(`/winners/${id}/payout`);
    fetchWinners();
  };

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  return (
    <div className="animate-fadeInUp">
      <div className="page-header">
        <h1>Winner <span className="text-gradient">Management</span></h1>
        <p>Verify winners and manage payouts</p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        {['', 'pending', 'approved', 'rejected'].map((f) => (
          <button key={f} className={`btn ${filter === f ? 'btn-primary' : 'btn-outline'} btn-sm`} onClick={() => setFilter(f)}>
            {f || 'All'}
          </button>
        ))}
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr><th>User</th><th>Draw</th><th>Match</th><th>Prize</th><th>Proof</th><th>Verification</th><th>Payment</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {winners.map((w) => (
              <tr key={w._id}>
                <td style={{ fontWeight: '600' }}>{w.userId?.fullName || 'N/A'}</td>
                <td>{new Date(w.drawId?.drawDate || w.createdAt).toLocaleDateString()}</td>
                <td><span className="badge badge-accent">{w.matchType}</span></td>
                <td style={{ fontWeight: '700', color: 'var(--accent-400)' }}>₹{w.prizeAmount.toLocaleString()}</td>
                <td>
                  {w.proofUrl ? <a href={w.proofUrl} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">View</a> : '—'}
                </td>
                <td>
                  <span className={`badge ${w.verificationStatus === 'approved' ? 'badge-success' : w.verificationStatus === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                    {w.verificationStatus}
                  </span>
                </td>
                <td>
                  <span className={`badge ${w.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                    {w.paymentStatus}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                  {w.verificationStatus === 'pending' && (
                    <>
                      <button className="btn btn-sm" onClick={() => handleVerify(w._id, 'approved')} style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>
                        <HiOutlineCheck /> Approve
                      </button>
                      <button className="btn btn-sm" onClick={() => handleVerify(w._id, 'rejected')} style={{ background: 'rgba(239, 68, 68, 0.15)', color: 'var(--error)' }}>
                        <HiOutlineX /> Reject
                      </button>
                    </>
                  )}
                  {w.verificationStatus === 'approved' && w.paymentStatus === 'pending' && (
                    <button className="btn btn-primary btn-sm" onClick={() => handlePayout(w._id)}>
                      <HiOutlineCash /> Mark Paid
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

export default WinnerManagement;
