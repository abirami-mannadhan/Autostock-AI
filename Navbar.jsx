import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Box, FileBarChart, Bell, Settings, User, ChevronDown } from 'lucide-react'
import { MOCK } from '../services/api.js'

const s = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    height: '56px',
    padding: '0 24px',
    background: '#0D1428',
    borderBottom: '1px solid #1E2D4A',
    gap: '24px',
    flexShrink: 0,
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: '"DM Serif Display", serif',
    fontSize: '18px',
    color: '#00E5CC',
    letterSpacing: '-0.3px',
    marginRight: '8px',
    flexShrink: 0,
  },
  logoDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#00E5CC',
    boxShadow: '0 0 0 3px rgba(0,229,204,0.2)',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    flex: 1,
  },
  link: (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 500,
    border: 'none',
    background: active ? 'rgba(0,229,204,0.1)' : 'transparent',
    color: active ? '#00E5CC' : '#7A8FA8',
    transition: 'all 0.15s',
    cursor: 'pointer',
  }),
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginLeft: 'auto',
  },
  alertBell: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    background: 'transparent',
    border: '1px solid #1E2D4A',
    color: '#7A8FA8',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  badge: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#FF6B6B',
    border: '1.5px solid #0D1428',
  },
  liveStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: '#4A6080',
  },
  liveDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#00E5CC',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 10px 4px 4px',
    borderRadius: '8px',
    border: '1px solid #1E2D4A',
    background: 'transparent',
    color: '#7A8FA8',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 500,
  },
  avatarCircle: {
    width: '26px',
    height: '26px',
    borderRadius: '6px',
    background: 'rgba(0,229,204,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    color: '#00E5CC',
    fontWeight: 600,
  },
}

const NAV_LINKS = [
  { label: 'Home', path: '/', icon: LayoutDashboard },
  { label: 'Dashboard', path: '/dashboard', icon: Box },
  { label: 'Reports', path: '/reports', icon: FileBarChart },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 1500)
    return () => clearInterval(t)
  }, [])

  const unread = MOCK.alerts.filter(a => !a.dismissed).length

  return (
    <nav style={s.nav}>
      <div style={s.logo}>
        <div style={{ ...s.logoDot, opacity: pulse ? 1 : 0.3, transition: 'opacity 0.5s' }} />
        AutoStock AI
      </div>

      <div style={s.links}>
        {NAV_LINKS.map(({ label, path, icon: Icon }) => (
          <button
            key={path}
            style={s.link(location.pathname === path)}
            onClick={() => navigate(path)}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <div style={s.right}>
        <div style={s.liveStatus}>
          <div style={{ ...s.liveDot, opacity: pulse ? 1 : 0.3, transition: 'opacity 0.5s' }} />
          Live
        </div>

        <button style={s.alertBell} title="Alerts">
          <Bell size={15} />
          {unread > 0 && <div style={s.badge} />}
        </button>

        <button style={s.avatar}>
          <div style={s.avatarCircle}>AD</div>
          Admin
          <ChevronDown size={12} />
        </button>
      </div>
    </nav>
  )
}
