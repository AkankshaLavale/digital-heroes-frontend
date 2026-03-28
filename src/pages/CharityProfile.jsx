import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

const CharityProfile = () => {
  const { id } = useParams();
  const [charity, setCharity] = useState(null);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/charities/${id}`).then(({ data }) => {
      setCharity(data.charity);
      setTotalContributions(data.totalContributions);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="page-loader" style={{ paddingTop: '120px' }}><div className="spinner"></div></div>;
  if (!charity) return <div className="page-loader" style={{ paddingTop: '120px' }}><p>Charity not found</p></div>;

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="card" style={{ padding: 'var(--space-2xl)' }}>
          {charity.imageUrl && (
            <img src={charity.imageUrl} alt={charity.name} style={{ borderRadius: 'var(--radius-xl)', marginBottom: 'var(--space-xl)', height: '300px', width: '100%', objectFit: 'cover' }} />
          )}
          {charity.featured && <span className="badge badge-accent" style={{ marginBottom: 'var(--space-md)' }}>Featured Charity</span>}
          <h1 style={{ marginBottom: 'var(--space-md)' }}>{charity.name}</h1>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: 'var(--space-xl)' }}>{charity.description}</p>

          <div className="grid grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
            <div className="card-stat">
              <div className="stat-value text-gradient">₹{totalContributions.toLocaleString()}</div>
              <div className="stat-label">Total Raised</div>
            </div>
            <div className="card-stat">
              <div className="stat-value" style={{ color: 'var(--primary-400)' }}>{charity.events?.length || 0}</div>
              <div className="stat-label">Events</div>
            </div>
          </div>

          {charity.websiteUrl && (
            <a href={charity.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Visit Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharityProfile;
