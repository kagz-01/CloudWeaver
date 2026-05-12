-- CloudWeaver Initial Schema
-- Designed for PostgreSQL 15+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cloud Providers Table
CREATE TABLE cloud_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    provider_type VARCHAR(50) NOT NULL, -- AWS, GCP, AZURE
    vault_path VARCHAR(512), -- Path to secrets in Vault
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Clusters Table
CREATE TABLE clusters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    provider_id UUID REFERENCES cloud_providers(id) ON DELETE CASCADE,
    environment VARCHAR(50) NOT NULL, -- DEV, STAGING, PROD
    region VARCHAR(100),
    status VARCHAR(50) DEFAULT 'PROVISIONING', -- ACTIVE, PROVISIONING, DELETING, ERROR
    config JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, provider_id)
);

-- Deployments Table
CREATE TABLE deployments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cluster_id UUID REFERENCES clusters(id) ON DELETE CASCADE,
    app_name VARCHAR(255) NOT NULL,
    version VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, IN_PROGRESS, SUCCESS, FAILED
    logs TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for performance
CREATE INDEX idx_clusters_provider ON clusters(provider_id);
CREATE INDEX idx_deployments_cluster ON deployments(cluster_id);
CREATE INDEX idx_clusters_status ON clusters(status);
