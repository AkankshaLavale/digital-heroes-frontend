import { useState, useEffect } from 'react';
import API from '../../api/axios';

const Winnings = () => {
  const [winnings, setWinnings] = useState({ winners: [], totalWon: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/winners').then(({ data }) => { setWinnings(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleUploadProof = async (winnerId, file) => {
    const formData = new FormData();
    formData.append('proof', file);
    try {
      await API.post(`/winners/${winnerId}/upload-proof`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { data } = await API.get('/winners');
      setWinnings(data);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  return (
    <div className="animate-fadeInUp">
      <div className="page-header">
        <h1>My <span className="text-gradient">Winnings</span></h1>
        <p>Track your prizes and payment status</p>
      </div>

      <div className="card-stat" style={{ marginBottom: 'var(--space-2xl)', maxWidth: '300px' }}>
        <div className="stat-value" style={{ color: 'var(--accent-400)' }}>₹{winnings.totalWon.toLocaleString()}</div>
        <div className="stat-label">Total Won (Approved)</div>
      </div>

      {winnings.winners.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🏆</div>
          <h3>No winnings yet</h3>
          <p>Keep entering draws — your moment is coming!</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Draw</th>
                <th>Match</th>
                <th>Prize</th>
                <th>Verification</th>
                <th>Payment</th>
                <th>Proof</th>
              </tr>
            </thead>
            <tbody>
              {winnings.winners.map((w) => (
                <tr key={w._id}>
                  <td>{new Date(w.drawId?.drawDate || w.createdAt).toLocaleDateString()}</td>
                  <td><span className="badge badge-accent">{w.matchType}</span></td>
                  <td style={{ fontWeight: '700', color: 'var(--accent-400)' }}>₹{w.prizeAmount.toLocaleString()}</td>
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
                  <td>
                    {w.proofUrl ? (
                      <a href={w.proofUrl} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">View</a>
                    ) : (
                      <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                        Upload
                        <input type="file" accept="image/*" hidden onChange={(e) => handleUploadProof(w._id, e.target.files[0])} />
                      </label>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Winnings;
