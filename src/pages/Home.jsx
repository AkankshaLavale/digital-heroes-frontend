import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineUserAdd, HiOutlineStar, HiOutlineTicket, HiOutlineHeart, HiArrowRight, HiCheckCircle } from 'react-icons/hi';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content animate-fadeInUp">
            <div className="hero-badge">
              <span className="badge badge-accent">🏆 Monthly Draws Live</span>
            </div>
            <h1>
              Your Golf Score. <br />
              <span className="text-gradient">Their Better Future.</span>
            </h1>
            <p className="hero-subtitle">
              Subscribe, enter your Stableford scores, and compete in monthly draws — 
              all while a portion of your subscription empowers charities you care about.
            </p>
            <div className="hero-actions">
              {user ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Go to Dashboard <HiArrowRight />
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-primary btn-lg">
                    Start Giving & Winning <HiArrowRight />
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-lg">
                    Sign In
                  </Link>
                </>
              )}
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">₹50K+</span>
                <span className="hero-stat-label">Prize Pool</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">₹25K+</span>
                <span className="hero-stat-label">Given to Charity</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">500+</span>
                <span className="hero-stat-label">Active Players</span>
              </div>
            </div>
          </div>
          <div className="hero-visual animate-fadeInUp stagger-2">
            <div className="hero-glow"></div>
            <div className="hero-card-stack">
              <div className="floating-card fc-1">
                <span className="fc-icon">🎯</span>
                <span>Score: 38</span>
              </div>
              <div className="floating-card fc-2">
                <span className="fc-icon">🏆</span>
                <span>5-Match Winner!</span>
              </div>
              <div className="floating-card fc-3">
                <span className="fc-icon">💚</span>
                <span>₹500 to charity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works">
        <div className="container">
          <div className="text-center mb-2xl">
            <h2>How It <span className="text-gradient">Works</span></h2>
            <p>Three simple steps to play, give, and win</p>
          </div>
          <div className="grid grid-3 steps-grid">
            {[
              { icon: <HiOutlineUserAdd />, step: '01', title: 'Subscribe', desc: 'Choose a monthly or yearly plan. A minimum of 10% goes directly to your chosen charity.' },
              { icon: <HiOutlineStar />, step: '02', title: 'Enter Scores', desc: 'Submit your latest 5 Stableford golf scores. Your rolling scores become your draw entry.' },
              { icon: <HiOutlineTicket />, step: '03', title: 'Win & Give', desc: 'Each month, a draw matches numbers to scores. Match 3, 4 or all 5 to win from the prize pool.' },
            ].map((item, i) => (
              <div key={i} className={`step-card card animate-fadeInUp stagger-${i + 1}`}>
                <div className="step-number">{item.step}</div>
                <div className="step-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Tiers */}
      <section className="section prize-section">
        <div className="container">
          <div className="text-center mb-2xl">
            <h2>Prize <span className="text-gradient">Tiers</span></h2>
            <p>Match your scores to winning numbers and claim your share</p>
          </div>
          <div className="grid grid-3">
            {[
              { match: '5-Number Match', pool: '40%', badge: 'Jackpot', color: 'var(--accent-400)', rollover: true },
              { match: '4-Number Match', pool: '35%', badge: 'Gold', color: 'var(--primary-400)', rollover: false },
              { match: '3-Number Match', pool: '25%', badge: 'Silver', color: 'var(--gray-400)', rollover: false },
            ].map((tier, i) => (
              <div key={i} className="card prize-card" style={{ '--accent': tier.color }}>
                <div className="prize-badge" style={{ color: tier.color }}>{tier.badge}</div>
                <h3>{tier.match}</h3>
                <div className="prize-pool-value">{tier.pool}</div>
                <p className="prize-pool-label">of Prize Pool</p>
                <div className="prize-features">
                  <div className="prize-feature"><HiCheckCircle /> Split equally among winners</div>
                  {tier.rollover && <div className="prize-feature"><HiCheckCircle /> Jackpot rolls over if unclaimed</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charity Spotlight */}
      <section className="section charity-spotlight">
        <div className="container">
          <div className="text-center mb-2xl">
            <h2>Making a <span className="text-gradient">Difference</span></h2>
            <p>Every subscription fuels real charitable impact</p>
          </div>
          <div className="spotlight-grid">
            <div className="card spotlight-card">
              <div className="spotlight-icon">💚</div>
              <h3>Choose Your Charity</h3>
              <p>Select from our directory of verified charities. Your minimum 10% contribution — optional to increase — goes directly to the cause you care about.</p>
            </div>
            <div className="card spotlight-card">
              <div className="spotlight-icon">🌍</div>
              <h3>Independent Donations</h3>
              <p>Beyond subscriptions, you can make standalone donations to any charity on the platform at any time.</p>
            </div>
            <div className="card spotlight-card">
              <div className="spotlight-icon">📊</div>
              <h3>Full Transparency</h3>
              <p>Track every contribution. See the total impact across all charities and your personal giving history.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-glow"></div>
            <h2>Ready to Play for <span className="text-gradient">Good</span>?</h2>
            <p>Join hundreds of golfers who are winning prizes and changing lives.</p>
            <Link to={user ? '/dashboard' : '/signup'} className="btn btn-accent btn-lg">
              {user ? 'Go to Dashboard' : 'Get Started Today'} <HiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
