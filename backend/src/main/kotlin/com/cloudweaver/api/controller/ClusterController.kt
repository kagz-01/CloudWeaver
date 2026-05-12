package com.cloudweaver.api.controller

import com.cloudweaver.api.model.Cluster
import com.cloudweaver.api.repository.ClusterRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/api/clusters")
class ClusterController(private val clusterRepository: ClusterRepository) {

    @GetMapping
    fun getAllClusters(): ResponseEntity<List<Cluster>> {
        val clusters = clusterRepository.findAll()
        return ResponseEntity.ok(clusters)
    }

    @GetMapping("/{id}")
    fun getClusterById(@PathVariable id: UUID): ResponseEntity<Cluster> {
        val cluster = clusterRepository.findById(id)
        return if (cluster.isPresent) {
            ResponseEntity.ok(cluster.get())
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping
    fun createCluster(@RequestBody cluster: Cluster): ResponseEntity<Cluster> {
        val savedCluster = clusterRepository.save(cluster)
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCluster)
    }

    @PutMapping("/{id}")
    fun updateCluster(@PathVariable id: UUID, @RequestBody clusterDetails: Cluster): ResponseEntity<Cluster> {
        return clusterRepository.findById(id).map { existingCluster ->
            val updatedCluster = existingCluster.copy(
                name = clusterDetails.name,
                provider = clusterDetails.provider,
                environment = clusterDetails.environment,
                region = clusterDetails.region,
                status = clusterDetails.status,
                config = clusterDetails.config
            )
            ResponseEntity.ok(clusterRepository.save(updatedCluster))
        }.orElse(ResponseEntity.notFound().build())
    }

    @DeleteMapping("/{id}")
    fun deleteCluster(@PathVariable id: UUID): ResponseEntity<Void> {
        return if (clusterRepository.existsById(id)) {
            clusterRepository.deleteById(id)
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
