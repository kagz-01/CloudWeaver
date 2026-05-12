'use client'

import { useEffect, useState } from 'react'
import { Activity, Cloud, Layers, Shield, RefreshCw } from 'lucide-react'

interface Cluster {
  id: string;
  name: string;
  providerType: string;
  environment: string;
  status: string;
  provider?: {
    providerType: string;
  };
}

export default function DashboardClient() {
  const [clusters, setClusters] = useState<Cluster[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClusters = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8080/api/clusters')
      if (!response.ok) throw new Error('Failed to fetch clusters')
      const data = await response.json()
      setClusters(data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Backend unreachable. Using simulation mode.')
      setClusters(mockClusters)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClusters()
  }, [])

  return (
    <div className="dashboard-container">
      <nav className="nav-fragment glass" aria-label="Primary Navigation">
        <div className="logo" aria-label="CloudWeaver Home">
          <Layers className="text-signal" />
          <span>CloudWeaver</span>
        </div>
        <div className="nav-links">
          <a href="#" className="active" aria-current="page">Clusters</a>
          <a href="#">Deployments</a>
          <a href="#">Secrets</a>
          <a href="#">Infrastructure</a>
        </div>
      </nav>

      <div className="main-content">
        <header className="content-header">
          <div>
            <h1 className="text-3xl">Infrastructure <span className="text-signal">Overview</span></h1>
            <p className="text-muted">Real-time status of multi-cloud clusters</p>
          </div>
          <div className="stats-row">
            <button 
              onClick={fetchClusters} 
              className="refresh-btn glass"
              aria-label="Refresh Cluster Status"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <div className="stat-pill glass">
              <Activity size={16} className="text-safe" />
              <span>{clusters.filter(c => ['Active', 'PROVISIONED'].includes(c.status)).length} Active</span>
            </div>
            <div className="stat-pill glass">
              <Shield size={16} className="text-signal" />
              <span>{clusters.filter(c => ['Warning', 'ERROR'].includes(c.status)).length} Alerts</span>
            </div>
          </div>
        </header>

        {error && (
          <div className="error-banner">
            <Shield size={14} />
            <span>{error}</span>
          </div>
        )}

        <div className="dashboard-grid">
          {clusters.map((cluster, i) => (
            <div 
              key={cluster.id} 
              className="brutal-card"
              style={{ 
                gridColumn: i % 3 === 0 ? 'span 5' : i % 3 === 1 ? 'span 4' : 'span 3',
                marginTop: i > 2 ? '-20px' : '0' 
              }}
            >
              <div className="card-header">
                <Cloud size={20} className="text-muted" />
                <span className="environment-tag">{cluster.environment}</span>
              </div>
              <h2 className="mt-4">{cluster.name}</h2>
              <div className="card-footer mt-6">
                <div className="provider-info">
                  <span className="text-muted">Provider:</span>
                  <span className="ml-2 font-bold">{cluster.providerType || cluster.provider?.providerType}</span>
                </div>
                <div className={`status-indicator ${['Active', 'PROVISIONED'].includes(cluster.status) ? 'safe' : 'warn'}`}>
                  {cluster.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="dashboard-footer mt-12">
          <div className="glass p-6 max-w-prose">
            <h3 className="text-signal text-sm mb-2">The CloudWeaver Mission</h3>
            <p className="text-muted text-xs leading-relaxed">
              We empower platform engineers to orchestrate multi-cloud infrastructure 
              with GitOps precision. Our goal is to eliminate complexity and 
              provide a single pane of glass for all your cloud resources.
            </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .dashboard-container { display: flex; min-height: 100vh; }
        .nav-fragment { width: 240px; height: 100vh; padding: 2rem; display: flex; flex-direction: column; gap: 3rem; border-right: 1px solid var(--border-dim); position: sticky; top: 0; }
        .logo { display: flex; align-items: center; gap: 1rem; font-weight: 900; font-size: 1.2rem; letter-spacing: 2px; }
        .nav-links { display: flex; flex-direction: column; gap: 1rem; }
        .nav-links a { text-decoration: none; color: var(--text-muted); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; transition: all var(--transition-fast); }
        .nav-links a:hover, .nav-links a.active { color: var(--text-primary); padding-left: 0.5rem; border-left: 2px solid var(--accent-signal); }
        .main-content { flex: 1; background: radial-gradient(circle at top right, var(--bg-secondary), transparent); padding-bottom: 5rem; }
        .content-header { padding: 3rem 2rem 1rem; display: flex; justify-content: space-between; align-items: flex-end; }
        .stats-row { display: flex; gap: 1rem; align-items: center; }
        .refresh-btn { border: none; color: var(--text-muted); cursor: pointer; padding: 0.5rem; display: flex; align-items: center; justify-content: center; transition: color 0.2s; }
        .refresh-btn:hover { color: var(--accent-signal); }
        .stat-pill { padding: 0.5rem 1rem; display: flex; align-items: center; gap: 0.75rem; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
        .error-banner { margin: 0 2rem 1rem; padding: 0.5rem 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #ef4444; font-size: 0.75rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; text-transform: uppercase; }
        .environment-tag { font-size: 0.7rem; background: var(--bg-accent); padding: 0.2rem 0.5rem; font-weight: 800; }
        .card-header { display: flex; justify-content: space-between; align-items: center; }
        .card-footer { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; }
        .status-indicator { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; }
        .status-indicator.safe { color: var(--accent-safe); }
        .status-indicator.warn { color: var(--accent-warn); }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .mt-4 { margin-top: 1rem; }
        .mt-6 { margin-top: 1.5rem; }
        .mt-12 { margin-top: 3rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .ml-2 { margin-left: 0.5rem; }
        .p-6 { padding: 1.5rem; }
        .text-3xl { font-size: clamp(1.5rem, 5vw, 1.875rem); }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .leading-relaxed { line-height: 1.625; }
        .max-w-prose { max-width: 65ch; margin-left: 2rem; }
        .font-bold { font-weight: 700; }
        .dashboard-footer { padding-bottom: 2rem; }
      `}</style>
    </div>
  )
}

const mockClusters = [
  { id: 'm1', name: 'US-East-Primary', providerType: 'AWS', environment: 'PROD', status: 'Active' },
  { id: 'm2', name: 'EU-West-Analytics', providerType: 'GCP', environment: 'STAGING', status: 'Active' },
  { id: 'm3', name: 'Global-CDN-Nodes', providerType: 'Azure', environment: 'PROD', status: 'Warning' },
]
