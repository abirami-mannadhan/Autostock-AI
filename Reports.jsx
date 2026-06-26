import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { Download, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react'
import { MOCK } from '../services/api.js'

const PIE_COLORS = ['#00E5CC', '#F5A623', '#7A8FA8', '#4A6080', '#2A3A50']

const s = {
  page: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: '"DM Serif Display", serif', fontSize: '22px', color: '#E8EDF5' },
  subtitle: { fontSize: '12px', color: '#4A6080', marginTop: '2px' },
  exportBtn: {
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '8px 14px', borderRadius: '8px',
    background: 'rgba(0,229,204,0.1)', border: '1px solid rgba(0,229,204,0.25)',
    color: '#00E5CC', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
  },
  summaryRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' },
  summaryCard: {
    background: '#111827', border: '1px solid #1E2D4A', borderRadius: '12px', padding: '16px 18px',
  },
  summaryLabel: { fontSize: '11px', color: '#4A6080', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' },
  summaryValue: { fontSize: '28px', fontWeight: 600, color: '#E8EDF5', lineHeight: 1 },
  summaryDelta: { fontSize: '11px', color: '#00E5CC', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px' },
  summaryIcon: (color) => ({
    float: 'right', width: '32px', height: '32px', borderRadius: '8px',
    background: color + '18', display: 'flex', alignItems: 'center',
    justifyContent: 'center', color,
  }),
  chartsRow: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' },
  card: {
    background: '#111827', border: '1px solid #1E2D4A',
    borderRadius: '12px', overflow: 'hidden',
  },
  cardHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 16px', borderBottom: '1px solid #1E2D4A',
  },
  cardTitle: { fontSize: '13px', fontWeight: 600, color: '#E8EDF5' },
  cardSub: { fontSize: '11px', color: '#4A6080' },
  chartWrap: { padding: '16px', height: '240px' },
  pieWrap: { padding: '16px', height: '240px', display: 'flex', alignItems: 'center' },
  legendList: { padding: '0 16px 14px' },
  legendRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '6px 0', borderBottom: '1px solid rgba(30,45,74,0.5)', fontSize: '12px',
  },
  legendName: { display: 'flex', alignItems: 'center', gap: '8px', color: '#A8B8CC' },
  legendDot: (color) => ({ width: '10px', height: '10px', borderRadius: '2px', background: color }),
  legendPct: { color: '#E8EDF5', fontWeight: 500 },
  rangeRow: { display: 'flex', gap: '6px' },
  rangeBtn: (active) => ({
    padding: '4px 10px', borderRadius: '6px', fontSize: '11px',
    fontWeight: 500, border: 'none',
    background: active ? 'rgba(0,229,204,0.12)' : '#0A0F1E',
    color: active ? '#00E5CC' : '#4A6080', cursor: 'pointer',
  }),
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#0D1428', border: '1px solid #1E2D4A', borderRadius: '8px', padding: '10px 14px', fontSize: '12px' }}>
      <div style={{ color: '#4A6080', marginBottom: '6px', fontSize: '10px' }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', gap: '8px', marginBottom: '3px', alignItems: 'center' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: p.fill }} />
          <span style={{ color: '#7A8FA8' }}>{p.name}:</span>
          <span style={{ color: '#E8EDF5', fontWeight: 500 }}>${p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

export default function Reports() {
  const [range, setRange] = useState('6M')
  const { monthly, categoryBreakdown } = MOCK.reports

  const totalRevenue = monthly.reduce((s, m) => s + m.revenue, 0)
  const totalOrders = monthly.reduce((s, m) => s + m.orders, 0)
  const avgMargin = Math.round(((totalRevenue - monthly.reduce((s, m) => s + m.cogs, 0)) / totalRevenue) * 100)

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Reports & Analytics</h1>
          <p style={{ ...s.subtitle, marginTop: '2px' }}>Last 6 months · All categories</p>
        </div>
        <button style={s.exportBtn}>
          <Download size={13} /> Export CSV
        </button>
      </div>

      <div style={s.summaryRow}>
        <div style={s.summaryCard}>
          <div style={{ overflow: 'hidden' }}>
            <div style={s.summaryIcon('#00E5CC')}><DollarSign size={16} /></div>
            <div style={s.summaryLabel}>Total revenue</div>
            <div style={s.summaryValue}>${(totalRevenue / 1000).toFixed(0)}k</div>
            <div style={s.summaryDelta}><TrendingUp size={11} /> +14.2% vs prior period</div>
          </div>
        </div>
        <div style={s.summaryCard}>
          <div style={{ overflow: 'hidden' }}>
            <div style={s.summaryIcon('#F5A623')}><ShoppingBag size={16} /></div>
            <div style={s.summaryLabel}>Total orders</div>
            <div style={s.summaryValue}>{totalOrders.toLocaleString()}</div>
            <div style={s.summaryDelta}><TrendingUp size={11} /> +8.7% vs prior period</div>
          </div>
        </div>
        <div style={s.summaryCard}>
          <div style={{ overflow: 'hidden' }}>
            <div style={s.summaryIcon('#00E5CC')}><TrendingUp size={16} /></div>
            <div style={s.summaryLabel}>Gross margin</div>
            <div style={s.summaryValue}>{avgMargin}%</div>
            <div style={s.summaryDelta}><TrendingUp size={11} /> +1.8pp improvement</div>
          </div>
        </div>
      </div>

      <div style={s.chartsRow}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <div>
              <div style={s.cardTitle}>Revenue vs COGS</div>
              <div style={s.cardSub}>Monthly breakdown</div>
            </div>
            <div style={s.rangeRow}>
              {['3M','6M','1Y'].map(r => (
                <button key={r} style={s.rangeBtn(range === r)} onClick={() => setRange(r)}>{r}</button>
              ))}
            </div>
          </div>
          <div style={s.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barGap={4}>
                <CartesianGrid stroke="#1E2D4A" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#4A6080', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4A6080', fontSize: 10 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `$${v/1000}k`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,229,204,0.04)' }} />
                <Bar dataKey="revenue" name="Revenue" fill="#00E5CC" radius={[3,3,0,0]} maxBarSize={28} />
                <Bar dataKey="cogs" name="COGS" fill="#1E2D4A" radius={[3,3,0,0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={s.card}>
          <div style={s.cardHeader}>
            <div style={s.cardTitle}>Sales by category</div>
          </div>
          <div style={s.pieWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%" cy="50%"
                  innerRadius={55} outerRadius={85}
                  dataKey="value" nameKey="name"
                  paddingAngle={2}
                >
                  {categoryBreakdown.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={s.legendList}>
            {categoryBreakdown.map((cat, i) => (
              <div key={cat.name} style={s.legendRow}>
                <div style={s.legendName}>
                  <div style={s.legendDot(PIE_COLORS[i])} />
                  {cat.name}
                </div>
                <span style={s.legendPct}>{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
