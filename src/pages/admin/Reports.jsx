import { useState, useEffect } from 'react';
import API from '../../api/axios';

const Reports = () => {
  const [charityReport, setCharityReport] = useState([]);
  const [drawStats, setDrawStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/admin/reports/charity-contributions'),
      API.get('/admin/reports/draw-statistics'),
    ]).then(([charityRes, drawRes]) => {
      setCharityReport(charityRes.data.contributions);
      setDrawStats(drawRes.data.stats);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  return (
    <div className="animate-fadeInUp">
      <div className="page-header">
        <h1><span className="text-gradient">Reports</span> & Analytics</h1>
        <p>Comprehensive platform insights</p>
      </div>

      {/* Charity Contributions */}
      <h3 style={{ marginBottom: 'var(--space-lg)' }}>Charity Contributions</h3>
      <div className="table-container" style={{ marginBottom: 'var(--space-2xl)' }}>
        <table className="table">
          <thead>
            <tr><th>Charity</th><th>Total Amount</th><th>Contributions</th></tr>
          </thead>
          <tbody>
            {charityReport.length === 0 ? (
              <tr><td colSpan="3" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No contributions yet</td></tr>
            ) : charityReport.map((c, i) => (
              <tr key={i}>
                <td style={{ fontWeight: '600' }}>{c.charity?.name || 'Unknown'}</td>
                <td style={{ fontWeight: '700', color: 'var(--primary-400)' }}>₹{c.totalAmount.toLocaleString()}</td>
                <td>{c.totalContributions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Draw Statistics */}
      <h3 style={{ marginBottom: 'var(--space-lg)' }}>Draw Statistics</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr><th>Draw Date</th><th>Status</th><th>Pool</th><th>Entries</th><th>Winners</th></tr>
          </thead>
          <tbody>
            {drawStats.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No draws yet</td></tr>
            ) : drawStats.map((s, i) => (
              <tr key={i}>
                <td>{new Date(s.draw.drawDate).toLocaleDateString()}</td>
                <td><span className="badge badge-success">{s.draw.status}</span></td>
                <td>₹{(s.draw.totalPool || 0).toLocaleString()}</td>
                <td>{s.entryCount}</td>
                <td>{s.winnerCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
