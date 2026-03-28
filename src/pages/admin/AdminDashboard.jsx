import { useState, useEffect } from 'react';
import API from '../../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/stats').then(({ data }) => { setStats(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers || 0, color: 'var(--primary-400)' },
    { label: 'Active Subscriptions', value: stats?.activeSubscriptions || 0, color: 'var(--success)' },
    { label: 'Total Prize Pool', value: `₹${(stats?.totalPrizePool || 0).toLocaleString()}`, color: 'var(--accent-400)' },
    { label: 'Charity Contributions', value: `₹${(stats?.totalCharityContributions || 0).toLocaleString()}`, color: 'var(--primary-300)' },
    { label: 'Total Draws', value: stats?.totalDraws || 0, color: 'var(--info)' },
    { label: 'Verified Winners', value: stats?.totalWinners || 0, color: 'var(--accent-400)' },
    { label: 'Total Paid Out', value: `₹${(stats?.totalPaidOut || 0).toLocaleString()}`, color: 'var(--success)' },
  ];

  return (
    <div className="animate-fadeInUp">
      <div className="page-header">
        <h1>Admin <span className="text-gradient">Dashboard</span></h1>
        <p>Platform overview and analytics</p>
      </div>

      <div className="grid grid-4">
        {statCards.map((stat, i) => (
          <div key={i} className="card-stat">
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
