package com.cloudweaver.api.service

import org.springframework.stereotype.Service
import org.springframework.vault.core.VaultTemplate

@Service
class VaultService(private val vaultTemplate: VaultTemplate) {

    /**
     * Retrieves a secret from the specified path in Vault.
     */
    fun getSecret(path: String): Map<String, Any>? {
        val response = vaultTemplate.read(path)
        return response?.data
    }

    /**
     * Writes a secret to the specified path in Vault.
     */
    fun writeSecret(path: String, secrets: Map<String, Any>) {
        vaultTemplate.write(path, secrets)
    }
}
