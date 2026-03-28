import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi';

const Subscribe = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/subscriptions/plans').then(({ data }) => setPlans(data.plans));
  }, []);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { data } = await API.post('/subscriptions/create', { planType: selectedPlan });
      
      // Open Razorpay checkout
      const options = {
        key: data.razorpayKeyId,
        subscription_id: data.subscriptionId,
        name: 'GolfCharity',
        description: `${selectedPlan === 'yearly' ? 'Yearly' : 'Monthly'} Subscription`,
        handler: async (response) => {
          await API.post('/subscriptions/verify', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_subscription_id: response.razorpay_subscription_id,
            razorpay_signature: response.razorpay_signature,
          });
          navigate('/dashboard');
        },
        theme: { color: '#059669' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Subscription error:', err);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Enter your golf scores',
    'Participate in monthly draws',
    'Win from the prize pool',
    'Support charities you love',
    'Dashboard & analytics',
    'Winner verification & payouts',
  ];

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="text-center mb-2xl">
          <h1>Choose Your <span className="text-gradient">Plan</span></h1>
          <p>Select a subscription to start playing and giving</p>
        </div>

        <div className="grid grid-2" style={{ gap: 'var(--space-xl)' }}>
          {/* Monthly */}
          <div 
            className={`card ${selectedPlan === 'monthly' ? 'animate-pulse-glow' : ''}`}
            style={{ 
              cursor: 'pointer',
              border: selectedPlan === 'monthly' ? '2px solid var(--primary-500)' : undefined,
              padding: 'var(--space-2xl)',
              textAlign: 'center',
            }}
            onClick={() => setSelectedPlan('monthly')}
          >
            <h3>Monthly</h3>
            <div style={{ fontSize: '3rem', fontWeight: '900', fontFamily: 'var(--font-display)', margin: 'var(--space-md) 0' }}>
              <span className="text-gradient">₹999</span>
            </div>
            <p>/month</p>
            <ul style={{ textAlign: 'left', marginTop: 'var(--space-xl)' }}>
              {features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <HiCheckCircle style={{ color: 'var(--primary-400)', flexShrink: 0 }} /> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Yearly */}
          <div 
            className={`card ${selectedPlan === 'yearly' ? 'animate-pulse-glow' : ''}`}
            style={{ 
              cursor: 'pointer',
              border: selectedPlan === 'yearly' ? '2px solid var(--accent-400)' : undefined,
              padding: 'var(--space-2xl)',
              textAlign: 'center',
              position: 'relative',
            }}
            onClick={() => setSelectedPlan('yearly')}
          >
            <span className="badge badge-accent" style={{ position: 'absolute', top: '-10px', right: '20px' }}>Save 17%</span>
            <h3>Yearly</h3>
            <div style={{ fontSize: '3rem', fontWeight: '900', fontFamily: 'var(--font-display)', margin: 'var(--space-md) 0' }}>
              <span className="text-gradient">₹9,999</span>
            </div>
            <p>/year</p>
            <ul style={{ textAlign: 'left', marginTop: 'var(--space-xl)' }}>
              {features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <HiCheckCircle style={{ color: 'var(--accent-400)', flexShrink: 0 }} /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
          <button className="btn btn-primary btn-lg" onClick={handleSubscribe} disabled={loading}>
            {loading ? <span className="spinner" style={{ width: '20px', height: '20px' }}></span> : <>Subscribe Now <HiArrowRight /></>}
          </button>
          <p style={{ marginTop: 'var(--space-md)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Minimum 10% of your subscription goes to your chosen charity
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
