import React, { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import { CloudRain, TrendingUp } from 'lucide-react'
import { MOCK } from '../services/api.js'

const RANGES = ['7D', '30D', '90D']

const s = {
  wrap: {
    background: '#111827',
    border: '1px solid #1E2D4A',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    borderBottom: '1px solid #1E2D4A',
  },
  titleWrap: {},
  title: { fontSize: '13px', fontWeight: 600, color: '#E8EDF5' },
  subtitle: { fontSize: '10px', color: '#4A6080', marginTop: '2px' },
  headerRight: { display: 'flex', gap: '8px', alignItems: 'center' },
  rangeBtn: (active) => ({
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 500,
    border: 'none',
    background: active ? 'rgba(0,229,204,0.12)' : '#0A0F1E',
    color: active ? '#00E5CC' : '#4A6080',
    cursor: 'pointer',
  }),
  signals: {
    display: 'flex',
    gap: '6px',
    padding: '10px 16px',
    borderBottom: '1px solid #1E2D4A',
  },
  signal: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 10px',
    borderRadius: '6px',
    background: 'rgba(0,229,204,0.07)',
    border: '1px solid rgba(0,229,204,0.15)',
    fontSize: '11px',
    color: '#7A8FA8',
  },
  chartWrap: { padding: '16px', height: '220px' },
  legend: {
    display: 'flex',
    gap: '16px',
    padding: '10px 16px',
    borderTop: '1px solid #1E2D4A',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: '#7A8FA8',
  },
  legendDot: (color) => ({
    width: '10px', height: '10px',
    borderRadius: '2px',
    background: color,
  }),
}

const SIGNAL_ICONS = { weather: CloudRain, trend: TrendingUp }

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#0D1428', border: '1px solid #1E2D4A',
      borderRadius: '8px', padding: '10px 14px', fontSize: '12px',
    }}>
      <div style={{ color: '#4A6080', marginBottom: '6px', fontSize: '10px' }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: p.color }} />
          <span style={{ color: '#7A8FA8' }}>{p.name}:</span>
          <span style={{ color: '#E8EDF5', fontWeight: 500 }}>{p.value} units</span>
        </div>
      ))}
    </div>
  )
}

export default function ForecastChart() {
  const [range, setRange] = useState('7D')
  const { labels, datasets, signals } = MOCK.forecast

  const chartData = labels.map((label, i) => {
    const row = { label }
    datasets.forEach(ds => { row[ds.name] = ds.data[i] })
    return row
  })

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <div style={s.titleWrap}>
          <div style={s.title}>Demand Forecast</div>
          <div style={s.subtitle}>AI-predicted demand by category</div>
        </div>
        <div style={s.headerRight}>
          {RANGES.map(r => (
            <button key={r} style={s.rangeBtn(range === r)} onClick={() => setRange(r)}>{r}</button>
          ))}
        </div>
      </div>

      <div style={s.signals}>
        {signals.map((sig, i) => {
          const Icon = SIGNAL_ICONS[sig.type] || TrendingUp
          return (
            <div key={i} style={s.signal}>
              <Icon size={12} color="#00E5CC" />
              <span style={{ color: '#E8EDF5', fontWeight: 500 }}>{sig.label}:</span>
              {sig.impact}
            </div>
          )
        })}
      </div>

      <div style={s.chartWrap}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#1E2D4A" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#4A6080', fontSize: 10, fontFamily: 'Space Grotesk' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#4A6080', fontSize: 10, fontFamily: 'Space Grotesk' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {datasets.map(ds => (
              <Line
                key={ds.name}
                type="monotone"
                dataKey={ds.name}
                stroke={ds.color}
                strokeWidth={ds.color === '#00E5CC' ? 2 : 1.5}
                dot={{ fill: ds.color, r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
                strokeDasharray={ds.color === '#4A6080' ? '4 3' : ds.color === '#F5A623' ? '5 3' : undefined}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={s.legend}>
        {datasets.map(ds => (
          <div key={ds.name} style={s.legendItem}>
            <div style={s.legendDot(ds.color)} />
            {ds.name}
          </div>
        ))}
      </div>
    </div>
  )
}
