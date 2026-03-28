import { useState, useEffect } from 'react';
import API from '../../api/axios';

const Draws = () => {
  const [draws, setDraws] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/draws').then(({ data }) => { setDraws(data.draws); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  return (
    <div className="animate-fadeInUp">
      <div className="page-header">
        <h1>Draw <span className="text-gradient">History</span></h1>
        <p>View past and upcoming draws</p>
      </div>

      {draws.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🎰</div>
          <h3>No draws yet</h3>
          <p>Draws are held monthly. Stay tuned!</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {draws.map((draw) => (
            <div key={draw._id} className="card" style={{ padding: 'var(--space-xl)' }}>
              <div className="flex-between mb-lg">
                <span className={`badge ${draw.status === 'published' ? 'badge-success' : draw.status === 'simulated' ? 'badge-warning' : 'badge-info'}`}>
                  {draw.status}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {new Date(draw.drawDate).toLocaleDateString()}
                </span>
              </div>

              <h3 style={{ marginBottom: 'var(--space-md)' }}>
                {new Date(draw.drawDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Draw
              </h3>

              {draw.status === 'published' && draw.winningNumbers && (
                <>
                  <p style={{ fontSize: '0.85rem', marginBottom: 'var(--space-sm)' }}>Winning Numbers:</p>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                    {draw.winningNumbers.map((num, i) => (
                      <span key={i} style={{
                        width: '45px', height: '45px',
                        background: 'linear-gradient(135deg, var(--primary-700), var(--primary-800))',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: '800', fontSize: '1.1rem', color: 'var(--primary-300)',
                        border: '2px solid var(--primary-500)',
                      }}>
                        {num}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <div className="grid grid-3" style={{ gap: 'var(--space-sm)' }}>
                <div style={{ textAlign: 'center', padding: 'var(--space-sm)', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>5-Match</div>
                  <div style={{ fontWeight: '700', color: 'var(--accent-400)' }}>₹{(draw.pool5Match || 0).toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'center', padding: 'var(--space-sm)', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>4-Match</div>
                  <div style={{ fontWeight: '700', color: 'var(--primary-400)' }}>₹{(draw.pool4Match || 0).toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'center', padding: 'var(--space-sm)', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>3-Match</div>
                  <div style={{ fontWeight: '700' }}>₹{(draw.pool3Match || 0).toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Draws;
