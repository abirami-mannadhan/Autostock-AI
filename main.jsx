import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const style = document.createElement('style')
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg-base: #0A0F1E;
    --bg-card: #111827;
    --bg-card-hover: #162033;
    --bg-sidebar: #0D1428;
    --border: #1E2D4A;
    --border-subtle: #162035;
    --teal: #00E5CC;
    --teal-dim: rgba(0,229,204,0.12);
    --teal-border: rgba(0,229,204,0.25);
    --amber: #F5A623;
    --amber-dim: rgba(245,166,35,0.12);
    --red: #FF6B6B;
    --red-dim: rgba(255,107,107,0.1);
    --text-primary: #E8EDF5;
    --text-secondary: #7A8FA8;
    --text-muted: #4A6080;
    --font-ui: 'Space Grotesk', system-ui, sans-serif;
    --font-display: 'DM Serif Display', Georgia, serif;
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 14px;
  }

  html, body, #root {
    height: 100%;
    background: var(--bg-base);
    color: var(--text-primary);
    font-family: var(--font-ui);
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  a { color: inherit; text-decoration: none; }
  button { cursor: pointer; font-family: var(--font-ui); }
  input, select, textarea { font-family: var(--font-ui); }

  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
`
document.head.appendChild(style)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
