import React, { useState } from 'react'
import { AlertCircle, AlertTriangle, Info, X, CheckCheck } from 'lucide-react'
import { MOCK } from '../services/api.js'

const TYPE_CONFIG = {
  critical: { icon: AlertCircle,    bg: 'rgba(255,107,107,0.08)', border: 'rgba(255,107,107,0.2)',  color: '#FF6B6B', label: 'Critical' },
  warning:  { icon: AlertTriangle,  bg: 'rgba(245,166,35,0.08)',  border: 'rgba(245,166,35,0.2)',   color: '#F5A623', label: 'Warning' },
  info:     { icon: Info,           bg: 'rgba(0,229,204,0.06)',   border: 'rgba(0,229,204,0.18)',   color: '#00E5CC', label: 'Info' },
}

const s = {
  wrap: {
    background: '#111827',
    border: '1px solid #1E2D4A',
    borderRadius: '12px',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 16px', borderBottom: '1px solid #1E2D4A', flexShrink: 0,
  },
  title: { fontSize: '13px', fontWeight: 600, color: '#E8EDF5' },
  clearBtn: {
    display: 'flex', alignItems: 'center', gap: '4px',
    fontSize: '11px', color: '#4A6080', background: 'none',
    border: 'none', cursor: 'pointer', padding: '4px 8px',
    borderRadius: '5px',
  },
  scroll: { flex: 1, overflowY: 'auto', padding: '10px' },
  alert: (type) => ({
    display: 'flex', alignItems: 'flex-start', gap: '10px',
    padding: '10px 12px', borderRadius: '8px', marginBottom: '8px',
    background: TYPE_CONFIG[type]?.bg || 'rgba(255,255,255,0.04)',
    border: `1px solid ${TYPE_CONFIG[type]?.border || '#1E2D4A'}`,
    position: 'relative',
  }),
  alertIcon: (type) => ({ color: TYPE_CONFIG[type]?.color, flexShrink: 0, marginTop: '1px' }),
  alertBody: { flex: 1, minWidth: 0 },
  alertTitle: { fontSize: '12px', fontWeight: 600, color: '#E8EDF5', marginBottom: '2px' },
  alertText: { fontSize: '11px', color: '#7A8FA8', lineHeight: 1.5 },
  alertMeta: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginTop: '6px',
  },
  alertTime: { fontSize: '10px', color: '#4A6080' },
  alertType: (type) => ({
    fontSize: '9px', fontWeight: 600, padding: '1px 6px', borderRadius: '8px',
    background: `${TYPE_CONFIG[type]?.color}18`,
    color: TYPE_CONFIG[type]?.color,
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
  }),
  dismissBtn: {
    background: 'none', border: 'none', color: '#4A6080',
    cursor: 'pointer', padding: '2px', borderRadius: '4px',
    flexShrink: 0, display: 'flex', alignItems: 'center',
    transition: 'color 0.15s',
  },
  empty: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', padding: '40px 20px', gap: '10px',
    color: '#4A6080', textAlign: 'center',
  },
}

export default function Alerts() {
  const [alerts, setAlerts] = useState(MOCK.alerts)

  function dismiss(id) {
    setAlerts(prev => prev.filter(a => a.id !== id))
  }

  function clearAll() {
    setAlerts([])
  }

  const active = alerts.filter(a => !a.dismissed)

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <span style={s.title}>Alerts ({active.length})</span>
        {active.length > 0 && (
          <button style={s.clearBtn} onClick={clearAll}>
            <CheckCheck size={12} /> Dismiss all
          </button>
        )}
      </div>

      <div style={s.scroll}>
        {active.length === 0 ? (
          <div style={s.empty}>
            <CheckCheck size={28} color="#00E5CC" />
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#7A8FA8' }}>All clear</div>
            <div style={{ fontSize: '11px' }}>No active alerts at this time.</div>
          </div>
        ) : active.map(alert => {
          const cfg = TYPE_CONFIG[alert.type] || TYPE_CONFIG.info
          const Icon = cfg.icon
          return (
            <div key={alert.id} style={s.alert(alert.type)}>
              <Icon size={14} style={s.alertIcon(alert.type)} />
              <div style={s.alertBody}>
                <div style={s.alertTitle}>{alert.title}</div>
                <div style={s.alertText}>{alert.body}</div>
                <div style={s.alertMeta}>
                  <span style={s.alertType(alert.type)}>{cfg.label}</span>
                  <span style={s.alertTime}>{alert.time}</span>
                </div>
              </div>
              <button style={s.dismissBtn} onClick={() => dismiss(alert.id)} title="Dismiss">
                <X size={13} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
