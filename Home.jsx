import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Zap, Brain, TrendingUp, Shield } from 'lucide-react'

const s = {
  page: {
    minHeight: '100%',
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'radial-gradient(ellipse at 50% 0%, rgba(0,229,204,0.05) 0%, transparent 60%)',
  },
  eyebrow: {
    display: 'flex', alignItems: 'center', gap: '8px',
    fontSize: '11px', color: '#00E5CC', fontWeight: 500,
    letterSpacing: '1.2px', textTransform: 'uppercase',
    marginBottom: '20px',
  },
  eyebrowDot: {
    width: '6px', height: '6px', borderRadius: '50%', background: '#00E5CC',
  },
  hero: {
    textAlign: 'center',
    maxWidth: '660px',
    marginBottom: '48px',
  },
  h1: {
    fontFamily: '"DM Serif Display", serif',
    fontSize: '48px',
    lineHeight: 1.15,
    color: '#E8EDF5',
    marginBottom: '18px',
    letterSpacing: '-0.5px',
  },
  accent: { color: '#00E5CC' },
  desc: {
    fontSize: '15px',
    color: '#7A8FA8',
    lineHeight: 1.7,
    marginBottom: '32px',
  },
  ctaRow: { display: 'flex', gap: '12px', justifyContent: 'center' },
  ctaPrimary: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '12px 24px', borderRadius: '10px',
    background: '#00E5CC', color: '#0A0F1E',
    fontSize: '14px', fontWeight: 600, border: 'none',
    cursor: 'pointer', transition: 'all 0.15s',
  },
  ctaSecondary: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '12px 24px', borderRadius: '10px',
    background: 'transparent', color: '#7A8FA8',
    fontSize: '14px', fontWeight: 500,
    border: '1px solid #1E2D4A', cursor: 'pointer',
    transition: 'all 0.15s',
  },
  statsRow: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px', width: '100%', maxWidth: '700px',
    marginBottom: '60px',
  },
  stat: {
    background: '#111827', border: '1px solid #1E2D4A',
    borderRadius: '12px', padding: '20px 24px', textAlign: 'center',
  },
  statNum: {
    fontFamily: '"DM Serif Display", serif',
    fontSize: '36px', color: '#00E5CC', lineHeight: 1,
    marginBottom: '4px',
  },
  statLabel: { fontSize: '12px', color: '#4A6080' },
  featuresGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px', width: '100%', maxWidth: '700px',
  },
  featureCard: {
    background: '#111827', border: '1px solid #1E2D4A',
    borderRadius: '12px', padding: '20px',
    display: 'flex', gap: '14px', alignItems: 'flex-start',
  },
  featureIcon: (color) => ({
    width: '36px', height: '36px', borderRadius: '9px',
    background: color + '18', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    color, flexShrink: 0,
  }),
  featureTitle: { fontSize: '13px', fontWeight: 600, color: '#E8EDF5', marginBottom: '4px' },
  featureDesc: { fontSize: '12px', color: '#7A8FA8', lineHeight: 1.6 },
}

const STATS = [
  { num: '94%', label: 'Average stock health across clients' },
  { num: '3.2×', label: 'Reduction in stock-out incidents' },
  { num: '18%', label: 'Lower average inventory carrying cost' },
]

const FEATURES = [
  { icon: Brain, color: '#00E5CC', title: 'AI demand prediction', desc: 'Combines sales history, weather, and market trends to forecast demand before it happens.' },
  { icon: Zap, color: '#F5A623', title: 'Auto purchase orders', desc: 'Generates and routes purchase orders automatically when stock approaches reorder thresholds.' },
  { icon: TrendingUp, color: '#00E5CC', title: 'Real-time signals', desc: 'External data feeds including weather forecasts and trend APIs enrich every prediction.' },
  { icon: Shield, color: '#7A8FA8', title: 'Zero stock-out guarantee', desc: 'Proactive alerts and actions ensure you never lose a sale to an empty shelf again.' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={s.page}>
      <div style={s.eyebrow}>
        <div style={s.eyebrowDot} />
        Intelligent inventory management
      </div>

      <div style={s.hero}>
        <h1 style={s.h1}>
          Welcome to AI-stock<br />
          <span style={s.accent}></span>
        </h1>
        <p style={s.desc}>
         Make Your Business Smarter, Faster, Stronger.
        </p>
        <div style={s.ctaRow}>
          <button style={s.ctaPrimary} onClick={() => navigate('/dashboard')}>
            Open dashboard <ArrowRight size={15} />
          </button>
          <button style={s.ctaSecondary} onClick={() => navigate('/reports')}>
            View reports
          </button>
        </div>
      </div>

      <div style={s.statsRow}>
        {STATS.map(({ num, label }) => (
          <div key={num} style={s.stat}>
            <div style={s.statNum}>{num}</div>
            <div style={s.statLabel}>{label}</div>
          </div>
        ))}
      </div>

      <div style={s.featuresGrid}>
        {FEATURES.map(({ icon: Icon, color, title, desc }) => (
          <div key={title} style={s.featureCard}>
            <div style={s.featureIcon(color)}><Icon size={18} /></div>
            <div>
              <div style={s.featureTitle}>{title}</div>
              <div style={s.featureDesc}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
