package com.cloudweaver.api.repository

import com.cloudweaver.api.model.CloudProvider
import com.cloudweaver.api.model.Cluster
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface CloudProviderRepository : JpaRepository<CloudProvider, UUID>

@Repository
interface ClusterRepository : JpaRepository<Cluster, UUID> {
    fun findByProviderId(providerId: UUID): List<Cluster>
}
