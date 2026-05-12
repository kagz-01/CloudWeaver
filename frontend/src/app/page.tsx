import type { Metadata } from 'next'
import DashboardClient from './DashboardClient'

export const metadata: Metadata = {
  title: 'Dashboard | Infrastructure Overview | CloudWeaver',
  description: 'Real-time multi-cloud cluster orchestration and infrastructure monitoring.',
  keywords: ['Cloud Dashboard', 'Infrastructure Monitoring', 'GitOps Overview'],
}

/**
 * Server Component that provides SEO metadata and renders the Client-side Dashboard.
 */
export default function DashboardPage() {
  return <DashboardClient />
}
