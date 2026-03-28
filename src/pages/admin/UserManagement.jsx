import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { HiOutlineSearch } from 'react-icons/hi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchUsers(); }, [search]);

  const fetchUsers = async () => {
    const { data } = await API.get('/admin/users', { params: { search } });
    setUsers(data.users);
    setLoading(false);
  };

  return (
    <div className="animate-fadeInUp">
      <div className="page-header">
        <h1>User <span className="text-gradient">Management</span></h1>
        <p>View and manage all users</p>
      </div>

      <div style={{ maxWidth: '400px', marginBottom: 'var(--space-xl)' }}>
        <div style={{ position: 'relative' }}>
          <HiOutlineSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input type="text" className="input" placeholder="Search users..." value={search}
            onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: '2.5rem', width: '100%' }} />
        </div>
      </div>

      {loading ? <div className="spinner"></div> : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Charity %</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td style={{ fontWeight: '600' }}>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td><span className={`badge ${u.role === 'admin' ? 'badge-accent' : 'badge-info'}`}>{u.role}</span></td>
                  <td>{u.charityPercentage}%</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
