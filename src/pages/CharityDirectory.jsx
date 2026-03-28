import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { HiOutlineSearch, HiOutlineHeart, HiArrowRight } from 'react-icons/hi';

const CharityDirectory = () => {
  const [charities, setCharities] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharities();
  }, [search]);

  const fetchCharities = async () => {
    try {
      const { data } = await API.get('/charities', { params: { search } });
      setCharities(data.charities);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div className="container">
        <div className="text-center mb-2xl">
          <h1>Our <span className="text-gradient">Charities</span></h1>
          <p>Discover and support causes that matter to you</p>
        </div>

        <div style={{ maxWidth: '500px', margin: '0 auto var(--space-2xl)' }}>
          <div style={{ position: 'relative' }}>
            <HiOutlineSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input"
              placeholder="Search charities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.5rem', width: '100%' }}
            />
          </div>
        </div>

        {loading ? (
          <div className="page-loader"><div className="spinner"></div></div>
        ) : charities.length === 0 ? (
          <div className="empty-state">
            <div className="icon"><HiOutlineHeart /></div>
            <h3>No charities found</h3>
            <p>Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-3">
            {charities.map((charity) => (
              <Link key={charity._id} to={`/charities/${charity._id}`} className="card" style={{ textDecoration: 'none' }}>
                {charity.imageUrl && (
                  <img src={charity.imageUrl} alt={charity.name} style={{ borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-md)', height: '160px', width: '100%', objectFit: 'cover' }} />
                )}
                {charity.featured && <span className="badge badge-accent" style={{ marginBottom: 'var(--space-sm)' }}>Featured</span>}
                <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-sm)' }}>{charity.name}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-md)' }}>
                  {charity.description?.substring(0, 120)}...
                </p>
                <span style={{ color: 'var(--primary-400)', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Learn More <HiArrowRight />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharityDirectory;
