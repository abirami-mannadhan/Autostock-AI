import React, { useState, useMemo } from 'react'
import { Search, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { MOCK } from '../services/api.js'

const STATUS_CONFIG = {
  healthy:   { label: 'Healthy',   bg: 'rgba(0,229,204,0.12)',   color: '#00E5CC' },
  low:       { label: 'Low',       bg: 'rgba(245,166,35,0.12)',  color: '#F5A623' },
  critical:  { label: 'Critical',  bg: 'rgba(255,107,107,0.12)', color: '#FF6B6B' },
  overstock: { label: 'Overstock', bg: 'rgba(245,166,35,0.12)',  color: '#F5A623' },
}

const s = {
  wrap: {
    background: '#111827',
    border: '1px solid #1E2D4A',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    borderBottom: '1px solid #1E2D4A',
    gap: '12px',
  },
  title: { fontSize: '13px', fontWeight: 600, color: '#E8EDF5' },
  searchWrap: {
    position: 'relative',
    flex: 1,
    maxWidth: '260px',
  },
  searchIcon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#4A6080',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '7px 10px 7px 32px',
    background: '#0A0F1E',
    border: '1px solid #1E2D4A',
    borderRadius: '7px',
    color: '#E8EDF5',
    fontSize: '12px',
    outline: 'none',
  },
  filterWrap: { display: 'flex', gap: '6px' },
  filterBtn: (active) => ({
    padding: '5px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 500,
    border: 'none',
    background: active ? 'rgba(0,229,204,0.12)' : '#0A0F1E',
    color: active ? '#00E5CC' : '#7A8FA8',
    cursor: 'pointer',
    transition: 'all 0.15s',
  }),
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    padding: '8px 16px',
    textAlign: 'left',
    fontSize: '10px',
    fontWeight: 600,
    color: '#4A6080',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    borderBottom: '1px solid #1E2D4A',
    whiteSpace: 'nowrap',
    background: '#0D1428',
  },
  thBtn: {
    display: 'flex', alignItems: 'center', gap: '4px',
    background: 'none', border: 'none', color: 'inherit',
    fontSize: 'inherit', fontWeight: 'inherit',
    letterSpacing: 'inherit', textTransform: 'inherit',
    cursor: 'pointer', padding: 0, fontFamily: 'inherit',
  },
  tr: (i) => ({
    background: i % 2 === 0 ? '#111827' : '#0F1A2E',
    transition: 'background 0.1s',
  }),
  td: {
    padding: '10px 16px',
    fontSize: '12px',
    color: '#A8B8CC',
    borderBottom: '1px solid rgba(30,45,74,0.5)',
    whiteSpace: 'nowrap',
  },
  badge: (status) => ({
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: 600,
    background: STATUS_CONFIG[status]?.bg || '#1E2D4A',
    color: STATUS_CONFIG[status]?.color || '#7A8FA8',
    letterSpacing: '0.3px',
  }),
  stockBar: {
    width: '70px',
    height: '5px',
    background: '#0A0F1E',
    borderRadius: '3px',
    overflow: 'hidden',
    marginTop: '4px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 16px',
    borderTop: '1px solid #1E2D4A',
    fontSize: '11px',
    color: '#4A6080',
  },
  pageBtn: {
    width: '26px', height: '26px', borderRadius: '6px',
    background: '#0A0F1E', border: '1px solid #1E2D4A',
    color: '#7A8FA8', display: 'flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer',
  },
}

const FILTERS = ['All', 'Critical', 'Low', 'Healthy', 'Overstock']
const PAGE_SIZE = 6

function StockBar({ stock, max, status }) {
  const pct = Math.min(100, Math.round((stock / max) * 100))
  const color = status === 'critical' ? '#FF6B6B' : status === 'low' ? '#F5A623' : status === 'overstock' ? '#F5A623' : '#00E5CC'
  return (
    <div>
      <span style={{ fontSize: '12px', color: '#E8EDF5', fontWeight: 500 }}>{stock.toLocaleString()}</span>
      <div style={s.stockBar}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width 0.3s' }} />
      </div>
    </div>
  )
}

export default function InventoryTable() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(0)

  const data = useMemo(() => {
    let rows = [...MOCK.inventory]
    if (search) rows = rows.filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.sku.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
    )
    if (filter !== 'All') rows = rows.filter(r => r.status === filter.toLowerCase())
    rows.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
    })
    return rows
  }, [search, filter, sortKey, sortDir])

  const pages = Math.ceil(data.length / PAGE_SIZE)
  const visible = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  function sort(key) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
    setPage(0)
  }

  function SortIcon({ col }) {
    if (sortKey !== col) return <ArrowUpDown size={11} style={{ opacity: 0.3 }} />
    return sortDir === 'asc' ? <ArrowUp size={11} /> : <ArrowDown size={11} />
  }

  return (
    <div style={s.wrap}>
      <div style={s.toolbar}>
        <span style={s.title}>Inventory ({data.length} items)</span>
        <div style={s.searchWrap}>
          <Search size={13} style={s.searchIcon} />
          <input
            style={s.searchInput}
            placeholder="Search SKU, name, category…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0) }}
          />
        </div>
        <div style={s.filterWrap}>
          {FILTERS.map(f => (
            <button key={f} style={s.filterBtn(filter === f)} onClick={() => { setFilter(f); setPage(0) }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <table style={s.table}>
        <thead>
          <tr>
            {[['name','Product'], ['sku','SKU'], ['category','Category'], ['stock','Stock'], ['supplier','Supplier'], ['status','Status']].map(([key, label]) => (
              <th key={key} style={s.th}>
                <button style={s.thBtn} onClick={() => sort(key)}>
                  {label} <SortIcon col={key} />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visible.length === 0 ? (
            <tr><td colSpan={6} style={{ ...s.td, textAlign: 'center', padding: '32px', color: '#4A6080' }}>No items match your filters</td></tr>
          ) : visible.map((row, i) => (
            <tr key={row.id} style={s.tr(i)}>
              <td style={{ ...s.td, color: '#E8EDF5', fontWeight: 500 }}>{row.name}</td>
              <td style={{ ...s.td, fontFamily: 'monospace', fontSize: '11px', color: '#4A6080' }}>{row.sku}</td>
              <td style={s.td}>{row.category}</td>
              <td style={s.td}>
                <StockBar stock={row.stock} max={row.maxStock} status={row.status} />
              </td>
              <td style={s.td}>{row.supplier}</td>
              <td style={s.td}><span style={s.badge(row.status)}>{STATUS_CONFIG[row.status]?.label}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={s.footer}>
        <span>Page {page + 1} of {Math.max(1, pages)}</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button style={s.pageBtn} onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
            <ChevronLeft size={13} />
          </button>
          <button style={s.pageBtn} onClick={() => setPage(p => Math.min(pages - 1, p + 1))} disabled={page >= pages - 1}>
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
