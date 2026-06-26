import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response?.data?.detail || err.message || 'Request failed'
    return Promise.reject(new Error(message))
  }
)

// --- Inventory ---
export const inventoryApi = {
  getAll: (params) => api.get('/inventory', { params }),
  getById: (id) => api.get(`/inventory/${id}`),
  update: (id, data) => api.patch(`/inventory/${id}`, data),
  getLowStock: () => api.get('/inventory/low-stock'),
}

// --- Forecast ---
export const forecastApi = {
  getDemand: (params) => api.get('/forecast/demand', { params }),
  getByCategory: (category) => api.get(`/forecast/demand/${category}`),
  getSignals: () => api.get('/forecast/signals'),
}

// --- Purchase Orders ---
export const purchaseOrderApi = {
  getAll: (params) => api.get('/purchase-orders', { params }),
  getById: (id) => api.get(`/purchase-orders/${id}`),
  approve: (id) => api.post(`/purchase-orders/${id}/approve`),
  reject: (id, reason) => api.post(`/purchase-orders/${id}/reject`, { reason }),
  create: (data) => api.post('/purchase-orders', data),
}

// --- Alerts ---
export const alertsApi = {
  getAll: () => api.get('/alerts'),
  dismiss: (id) => api.patch(`/alerts/${id}/dismiss`),
  getUnread: () => api.get('/alerts/unread'),
}

// --- Dashboard ---
export const dashboardApi = {
  getKPIs: () => api.get('/dashboard/kpis'),
  getStockHealth: () => api.get('/dashboard/stock-health'),
}

// --- Reports ---
export const reportsApi = {
  getSummary: (params) => api.get('/reports/summary', { params }),
  getInventoryTurnover: (params) => api.get('/reports/turnover', { params }),
  export: (type, params) => api.get(`/reports/export/${type}`, { params, responseType: 'blob' }),
}

export default api

// ─── Mock data for development (used when backend is unavailable) ───────────

export const MOCK = {
  kpis: {
    stockHealth: 94,
    stockHealthDelta: 2.1,
    activeSkus: 1842,
    skusAdded: 12,
    lowStockAlerts: 18,
    criticalAlerts: 3,
    pendingPOs: 3,
  },

  inventory: [
    { id: 1, sku: 'USBC-6FT-BLK', name: 'USB-C Cable 6ft', category: 'Electronics', stock: 48, reorderPoint: 200, maxStock: 600, status: 'critical', supplier: 'TechLink Co.' },
    { id: 2, sku: 'WE-PRO-BLU', name: 'Wireless Earbuds Pro', category: 'Electronics', stock: 312, reorderPoint: 150, maxStock: 500, status: 'healthy', supplier: 'SoundGear Ltd.' },
    { id: 3, sku: 'BATT-AA-4PK', name: 'AA Batteries 4pk', category: 'Accessories', stock: 190, reorderPoint: 300, maxStock: 900, status: 'low', supplier: 'PowerBase Inc.' },
    { id: 4, sku: 'PC-IP15-CLR', name: 'Phone Case iPhone 15', category: 'Accessories', stock: 1204, reorderPoint: 200, maxStock: 1400, status: 'healthy', supplier: 'CaseCraft' },
    { id: 5, sku: 'JKT-WNT-LRG', name: 'Winter Jacket Large', category: 'Apparel', stock: 840, reorderPoint: 100, maxStock: 500, status: 'overstock', supplier: 'OutdoorWear Co.' },
    { id: 6, sku: 'UMB-FOLD-BLK', name: 'Foldable Umbrella', category: 'Home & Garden', stock: 95, reorderPoint: 80, maxStock: 300, status: 'healthy', supplier: 'RainGear Ltd.' },
    { id: 7, sku: 'HDMI-4K-2M', name: 'HDMI 4K Cable 2m', category: 'Electronics', stock: 34, reorderPoint: 100, maxStock: 400, status: 'low', supplier: 'TechLink Co.' },
    { id: 8, sku: 'CHAIR-ERG-BLK', name: 'Ergonomic Chair', category: 'Furniture', stock: 22, reorderPoint: 10, maxStock: 80, status: 'healthy', supplier: 'OfficePro' },
  ],

  forecast: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { name: 'Electronics', data: [420, 390, 480, 510, 465, 610, 720], color: '#00E5CC' },
      { name: 'Apparel', data: [280, 310, 290, 350, 320, 260, 230], color: '#F5A623' },
      { name: 'Home goods', data: [180, 195, 200, 185, 210, 225, 205], color: '#4A6080' },
    ],
    signals: [
      { type: 'weather', label: 'Rain forecast', impact: '+22% umbrella demand', icon: 'cloud-rain' },
      { type: 'trend', label: 'Market surge', impact: '+8% electronics', icon: 'trending-up' },
    ],
  },

  purchaseOrders: [
    { id: 'PO-2401', product: 'USB-C Cable 6ft', sku: 'USBC-6FT-BLK', supplier: 'TechLink Co.', qty: 600, total: 2840, eta: '3 days', status: 'urgent', createdBy: 'AI' },
    { id: 'PO-2402', product: 'AA Batteries 4pk × 500', sku: 'BATT-AA-4PK', supplier: 'PowerBase Inc.', qty: 500, total: 1150, eta: '5 days', status: 'pending', createdBy: 'AI' },
    { id: 'PO-2403', product: 'Foldable Umbrella × 200', sku: 'UMB-FOLD-BLK', supplier: 'RainGear Ltd.', qty: 200, total: 3600, eta: '4 days', status: 'ai-signal', createdBy: 'AI' },
    { id: 'PO-2398', product: 'Phone Case iPhone 15', sku: 'PC-IP15-CLR', supplier: 'CaseCraft', qty: 300, total: 4200, eta: 'Delivered', status: 'approved', createdBy: 'Manual' },
  ],

  alerts: [
    { id: 1, type: 'critical', title: 'Stock-out imminent', body: 'USB-C Cables will stock out in 2 days. PO auto-generated.', time: '5 min ago', dismissed: false },
    { id: 2, type: 'warning', title: 'Overstocked item', body: 'Winter Jackets overstocked by 340 units vs forecast.', time: '1 hour ago', dismissed: false },
    { id: 3, type: 'info', title: 'Weather signal detected', body: 'Rain forecast → umbrellas demand +22% predicted next 3 days.', time: '2 hours ago', dismissed: false },
    { id: 4, type: 'warning', title: 'Reorder point reached', body: 'AA Batteries — 8 days supply remaining.', time: '3 hours ago', dismissed: false },
    { id: 5, type: 'info', title: 'AI forecast updated', body: 'Electronics demand model retrained with Q1 data. Accuracy +4%.', time: '6 hours ago', dismissed: false },
  ],

  reports: {
    monthly: [
      { month: 'Aug', revenue: 84000, cogs: 51000, orders: 1240 },
      { month: 'Sep', revenue: 91000, cogs: 55000, orders: 1380 },
      { month: 'Oct', revenue: 78000, cogs: 48000, orders: 1100 },
      { month: 'Nov', revenue: 110000, cogs: 66000, orders: 1640 },
      { month: 'Dec', revenue: 145000, cogs: 88000, orders: 2100 },
      { month: 'Jan', revenue: 96000, cogs: 58000, orders: 1420 },
    ],
    categoryBreakdown: [
      { name: 'Electronics', value: 42 },
      { name: 'Apparel', value: 24 },
      { name: 'Accessories', value: 18 },
      { name: 'Home & Garden', value: 10 },
      { name: 'Furniture', value: 6 },
    ],
  },
}
