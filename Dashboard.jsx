import React from 'react'
import DashboardShell from '../components/Dashboard.jsx'
import ForecastChart from '../components/ForecastChart.jsx'
import InventoryTable from '../components/InventoryTable.jsx'
import PurchaseOrder from '../components/PurchaseOrder.jsx'
import Alerts from '../components/Alerts.jsx'

const s = {
  mainCol: { display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 },
  sideCol: { display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 },
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div style={s.mainCol}>
        <ForecastChart />
        <InventoryTable />
      </div>
      <div style={s.sideCol}>
        <PurchaseOrder />
        <Alerts />
      </div>
    </DashboardShell>
  )
}
