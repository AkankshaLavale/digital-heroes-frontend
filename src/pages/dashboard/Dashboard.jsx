import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineStar, HiOutlineTicket, HiOutlineHeart, HiOutlineSparkles, HiArrowRight } from 'react-icons/hi';

const Dashboard = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [scores, setScores] = useState([]);
  const [winnings, setWinnings] = useState({ winners: [], totalWon: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/subscriptions/status'),
      API.get('/scores'),
      API.get('/winners'),
    ]).then(([subRes, scoreRes, winRes]) => {
      setSubscription(subRes.data);
      setScores(scoreRes.data.scores);
      setWinnings(winRes.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  return (
    <div className="animate-fadeInUp">
      <div className="page-header">
        <h1>Welcome back, <span className="text-gradient">{user?.fullName?.split(' ')[0]}</span></h1>
        <p>Here's your overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-4" style={{ marginBottom: 'var(--space-2xl)' }}>
        <div className="card-stat">
          <div className="stat-value" style={{ color: subscription?.isActive ? 'var(--success)' : 'var(--error)' }}>
            {subscription?.isActive ? '✓ Active' : '✗ Inactive'}
          </div>
          <div className="stat-label">Subscription</div>
        </div>
        <div className="card-stat">
          <div className="stat-value text-gradient">{scores.length}/5</div>
          <div className="stat-label">Scores Entered</div>
        </div>
        <div className="card-stat">
          <div className="stat-value" style={{ color: 'var(--accent-400)' }}>₹{winnings.totalWon.toLocaleString()}</div>
          <div className="stat-label">Total Won</div>
        </div>
        <div className="card-stat">
          <div className="stat-value" style={{ color: 'var(--primary-400)' }}>{user?.charityPercentage || 10}%</div>
          <div className="stat-label">Charity Share</div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 style={{ marginBottom: 'var(--space-lg)' }}>Quick Actions</h3>
      <div className="grid grid-2" style={{ marginBottom: 'var(--space-2xl)' }}>
        {!subscription?.isActive && (
          <Link to="/subscribe" className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', textDecoration: 'none' }}>
            <div style={{ fontSize: '2rem', color: 'var(--primary-400)' }}><HiOutlineTicket /></div>
            <div>
              <h4>Subscribe Now</h4>
              <p style={{ fontSize: '0.85rem' }}>Get started with a plan to enter draws</p>
            </div>
            <HiArrowRight style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
          </Link>
        )}
        <Link to="/dashboard/scores" className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', textDecoration: 'none' }}>
          <div style={{ fontSize: '2rem', color: 'var(--accent-400)' }}><HiOutlineStar /></div>
          <div>
            <h4>{scores.length < 5 ? 'Enter Scores' : 'View Scores'}</h4>
            <p style={{ fontSize: '0.85rem' }}>{scores.length < 5 ? `${5 - scores.length} more needed for draws` : 'All 5 scores entered'}</p>
          </div>
          <HiArrowRight style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
        </Link>
        <Link to="/dashboard/charity" className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', textDecoration: 'none' }}>
          <div style={{ fontSize: '2rem', color: 'var(--success)' }}><HiOutlineHeart /></div>
          <div>
            <h4>{user?.selectedCharity ? 'Your Charity' : 'Choose a Charity'}</h4>
            <p style={{ fontSize: '0.85rem' }}>Select a charity for your contributions</p>
          </div>
          <HiArrowRight style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
        </Link>
        <Link to="/dashboard/winnings" className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', textDecoration: 'none' }}>
          <div style={{ fontSize: '2rem', color: 'var(--accent-400)' }}><HiOutlineSparkles /></div>
          <div>
            <h4>Winnings</h4>
            <p style={{ fontSize: '0.85rem' }}>{winnings.winners.length} win(s) total</p>
          </div>
          <HiArrowRight style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
        </Link>
      </div>

      {/* Recent Scores */}
      {scores.length > 0 && (
        <>
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>Your Latest Scores</h3>
          <div className="card" style={{ padding: 'var(--space-lg)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              {scores.map((s, i) => (
                <div key={s._id} style={{
                  width: '80px', height: '80px',
                  background: 'linear-gradient(135deg, var(--primary-800), var(--primary-900))',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  border: '1px solid var(--surface-border)',
                }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-400)' }}>{s.score}</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>#{i + 1}</span>
                </div>
              ))}
              {Array.from({ length: 5 - scores.length }).map((_, i) => (
                <div key={`empty-${i}`} style={{
                  width: '80px', height: '80px',
                  background: 'var(--bg-glass)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px dashed var(--surface-border)',
                  color: 'var(--text-muted)', fontSize: '0.75rem',
                }}>
                  Empty
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
