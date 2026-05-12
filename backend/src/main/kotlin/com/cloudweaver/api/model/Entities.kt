package com.cloudweaver.api.model

import jakarta.persistence.*
import java.time.OffsetDateTime
import java.util.UUID

@Entity
@Table(name = "cloud_providers")
data class CloudProvider(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,

    @Column(nullable = false, unique = true)
    val name: String,

    @Column(name = "provider_type", nullable = false)
    val providerType: String,

    @Column(name = "vault_path")
    val vaultPath: String? = null,

    @Column(name = "created_at")
    val createdAt: OffsetDateTime = OffsetDateTime.now(),

    @Column(name = "updated_at")
    val updatedAt: OffsetDateTime = OffsetDateTime.now()
)

@Entity
@Table(name = "clusters")
data class Cluster(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,

    @Column(nullable = false)
    val name: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id")
    val provider: CloudProvider,

    @Column(nullable = false)
    val environment: String,

    val region: String? = null,

    @Column(nullable = false)
    val status: String = "PROVISIONING",

    @Column(columnDefinition = "jsonb")
    val config: String = "{}",

    @Column(name = "created_at")
    val createdAt: OffsetDateTime = OffsetDateTime.now(),

    @Column(name = "updated_at")
    val updatedAt: OffsetDateTime = OffsetDateTime.now()
)
