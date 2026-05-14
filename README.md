# 🌌 CloudWeaver

**GitOps-Native Multi-Cloud Orchestration Platform**

CloudWeaver is a premium infrastructure management platform designed for platform engineers who demand precision, scale, and a unified "single pane of glass" for multi-cloud environments. It bridges the gap between high-level visualization and low-level Infrastructure-as-Code (IaC) execution.

---

## ⚡ The "W"s of CloudWeaver

### **What is it?**
A full-stack orchestrator that manages AWS, Azure, and GCP clusters through a centralized GitOps loop. It visualizes cluster health, handles secure secret rotation via HashiCorp Vault, and triggers Terraform plans programmatically.

### **Why build it?**
To eliminate the fragmentation of multi-cloud management. CloudWeaver replaces disparate cloud consoles with a unified, high-contrast dashboard that prioritizes signal over noise.

### **Who is it for?**
Platform Engineering teams, SREs, and DevOps architects looking for a localized, secure, and extensible control plane for their cloud assets.

### **How does it work?**
1. **Frontend**: Next.js 14 (App Router) provides a "Technical Brutalist" dashboard.
2. **Backend**: Kotlin/Spring Boot 3.2 handles logic, security, and integration.
3. **Storage**: PostgreSQL 15 manages metadata; HashiCorp Vault manages secrets.
4. **Execution**: A dedicated Terraform Service executes IaC commands in a secure loop.

---

## 🛠️ Technology Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Core API** | Kotlin + Spring Boot 3.2 | Type-safety, performance, and robust ecosystem. |
| **Dashboard** | Next.js 14 + Vanilla CSS | Extreme customization, SSR for SEO, and zero-bloat styling. |
| **Secrets** | HashiCorp Vault | Industry standard for secure secret management. |
| **Data** | PostgreSQL 15 | Relational integrity for complex infrastructure mapping. |
| **IaC** | Terraform | Vendor-neutral infrastructure orchestration. |
| **Runtime** | Docker + Docker Compose | Consistent, localized orchestration and isolation. |

---

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- No local Gradle or Node.js required (Fully Containerized)

### Launch the Stack
```bash
docker-compose up --build
```

### Access Points
- **Dashboard**: `http://localhost:3000`
- **Backend API**: `http://localhost:8080/api/health`
- **Vault Console**: `http://localhost:8200` (Token: `root`)

---

## 🏗️ Architecture Detail

CloudWeaver follows a **Layered Control Plane** pattern:
- **Presentation Layer**: React Client Components with staggered grid layouts for high-density information.
- **Logic Layer**: RESTful Spring controllers with JPA repositories for state persistence.
- **Security Layer**: Vault integration for just-in-time secret retrieval.
- **Execution Layer**: Programmatic Terraform bridge using Java ProcessBuilder for localized GitOps simulation.

---

## 🎨 Design Philosophy: Technical Brutalism
CloudWeaver rejects "soft" enterprise design. It uses:
- **High Contrast**: Signal Orange and Neon Green against Deep Slate.
- **Geometric Rigor**: Sharp edges, fragmented grids, and physics-based micro-animations.
- **GPU Acceleration**: All UI transitions utilize CSS `transform` and `opacity` for 60fps performance.

---
*Built by Antigravity for Cloud Architects.*
