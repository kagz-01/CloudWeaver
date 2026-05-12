import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CloudWeaver | GitOps-Native Multi-Cloud Orchestrator',
  description: 'Manage multi-cloud infrastructure with precision using CloudWeaver. A GitOps-native platform for platform engineers.',
  keywords: ['Cloud Management', 'GitOps', 'Multi-Cloud', 'Terraform', 'Kubernetes', 'Infrastructure as Code'],
  authors: [{ name: 'CloudWeaver Team' }],
  openGraph: {
    title: 'CloudWeaver | Multi-Cloud Orchestrator',
    description: 'Precision GitOps orchestration for modern cloud infrastructure.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
