import React, { useState } from 'react'
import { Check, X, Bot, User, ExternalLink } from 'lucide-react'
import { MOCK } from '../services/api.js'

const STATUS_CONFIG = {
  urgent:      { label: 'Urgent',     bg: 'rgba(255,107,107,0.12)', color: '#FF6B6B' },
  pending:     { label: 'Pending',    bg: 'rgba(245,166,35,0.12)',  color: '#F5A623' },
  'ai-signal': { label: 'AI Signal',  bg: 'rgba(0,229,204,0.10)',   color: '#00E5CC' },
  approved:    { label: 'Approved',   bg: 'rgba(0,229,204,0.10)',   color: '#00E5CC' },
  rejected:    { label: 'Rejected',   bg: 'rgba(255,107,107,0.10)', color: '#FF6B6B' },
}

const s = {
  wrap: {
    background: '#111827',
    border: '1px solid #1E2D4A',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 16px', borderBottom: '1px solid #1E2D4A',
  },
  title: { fontSize: '13px', fontWeight: 600, color: '#E8EDF5' },
  pendingCount: {
    fontSize: '11px', fontWeight: 500, padding: '2px 8px',
    borderRadius: '10px', background: 'rgba(0,229,204,0.1)', color: '#00E5CC',
  },
  list: { padding: '8px 0' },
  row: {
    display: 'flex', alignItems: 'center',
    padding: '12px 16px', gap: '12px',
    borderBottom: '1px solid rgba(30,45,74,0.5)',
    transition: 'background 0.1s',
  },
  poId: { fontSize: '10px', color: '#4A6080', fontFamily: 'monospace', flexShrink: 0 },
  poInfo: { flex: 1, minWidth: 0 },
  poName: { fontSize: '12px', fontWeight: 500, color: '#E8EDF5', marginBottom: '2px' },
  poMeta: { fontSize: '10px', color: '#4A6080', display: 'flex', gap: '8px', alignItems: 'center' },
  poRight: { display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 },
  amount: { fontSize: '14px', fontWeight: 600, color: '#00E5CC' },
  badge: (status) => ({
    display: 'inline-block', padding: '2px 8px', borderRadius: '10px',
    fontSize: '10px', fontWeight: 600,
    background: STATUS_CONFIG[status]?.bg || '#1E2D4A',
    color: STATUS_CONFIG[status]?.color || '#7A8FA8',
  }),
  actions: { display: 'flex', gap: '6px' },
  actionBtn: (color) => ({
    width: '28px', height: '28px', borderRadius: '7px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: `1px solid ${color}30`,
    background: `${color}10`,
    color, cursor: 'pointer',
    transition: 'all 0.15s',
  }),
  createdBy: {
    display: 'flex', alignItems: 'center', gap: '3px',
    fontSize: '10px', color: '#4A6080',
  },
  total: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 16px', borderTop: '1px solid #1E2D4A',
    fontSize: '12px', color: '#7A8FA8',
  },
  totalAmount: { fontSize: '15px', fontWeight: 600, color: '#E8EDF5' },
}

export default function PurchaseOrder() {
  const [orders, setOrders] = useState(MOCK.purchaseOrders)
  const [toast, setToast] = useState(null)

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  function approve(id) {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'approved' } : o))
    showToast('Purchase order approved')
  }

  function reject(id) {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'rejected' } : o))
    showToast('Purchase order rejected')
  }

  const pending = orders.filter(o => !['approved', 'rejected'].includes(o.status))
  const pendingTotal = pending.reduce((sum, o) => sum + o.total, 0)

  return (
    <div style={{ position: 'relative' }}>
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 200,
          background: '#111827', border: '1px solid #1E2D4A', borderRadius: '10px',
          padding: '10px 16px', fontSize: '13px', color: '#00E5CC',
          display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          <Check size={14} /> {toast}
        </div>
      )}

      <div style={s.wrap}>
        <div style={s.header}>
          <span style={s.title}>Purchase Orders</span>
          {pending.length > 0 && (
            <span style={s.pendingCount}>{pending.length} pending</span>
          )}
        </div>

        <div style={s.list}>
          {orders.map(order => {
            const actionable = !['approved', 'rejected'].includes(order.status)
            return (
              <div key={order.id} style={s.row}>
                <div style={s.poId}>{order.id}</div>

                <div style={s.poInfo}>
                  <div style={s.poName}>{order.product}</div>
                  <div style={s.poMeta}>
                    <span>{order.supplier}</span>
                    <span>·</span>
                    <span>ETA {order.eta}</span>
                    <span>·</span>
                    <span style={s.createdBy}>
                      {order.createdBy === 'AI' ? <Bot size={10} /> : <User size={10} />}
                      {order.createdBy}
                    </span>
                  </div>
                </div>

                <div style={s.poRight}>
                  <div style={s.amount}>${order.total.toLocaleString()}</div>
                  <span style={s.badge(order.status)}>
                    {STATUS_CONFIG[order.status]?.label || order.status}
                  </span>
                  {actionable && (
                    <div style={s.actions}>
                      <button style={s.actionBtn('#00E5CC')} onClick={() => approve(order.id)} title="Approve">
                        <Check size={13} />
                      </button>
                      <button style={s.actionBtn('#FF6B6B')} onClick={() => reject(order.id)} title="Reject">
                        <X size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div style={s.total}>
          <span>Pending total</span>
          <span style={s.totalAmount}>${pendingTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
