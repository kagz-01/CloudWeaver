package com.cloudweaver.api.service

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.io.File
import java.util.concurrent.TimeUnit

@Service
class TerraformService {
    
    private val logger = LoggerFactory.getLogger(TerraformService::class.java)
    
    /**
     * Executes a Terraform command in the specified working directory.
     * 
     * @param workingDirectory The directory containing the Terraform configuration files.
     * @param command The Terraform command to run (e.g., "init", "plan", "apply -auto-approve").
     * @return A pair containing the exit code and the command output.
     */
    fun executeTerraformCommand(workingDirectory: String, command: String): Pair<Int, String> {
        val dir = File(workingDirectory)
        if (!dir.exists() || !dir.isDirectory) {
            throw IllegalArgumentException("Invalid working directory: $workingDirectory")
        }

        val processBuilder = ProcessBuilder()
        // Split command for ProcessBuilder
        val commandParts = mutableListOf("terraform")
        commandParts.addAll(command.split(" "))
        
        processBuilder.command(commandParts)
        processBuilder.directory(dir)
        processBuilder.redirectErrorStream(true) // Merge stderr and stdout

        logger.info("Executing Terraform command in $workingDirectory: ${commandParts.joinToString(" ")}")

        try {
            val process = processBuilder.start()
            // Read output
            val output = process.inputStream.bufferedReader().use { it.readText() }
            
            // Wait for completion (timeout after 5 minutes for safety)
            val completed = process.waitFor(5, TimeUnit.MINUTES)
            
            if (!completed) {
                process.destroyForcibly()
                logger.error("Terraform command timed out: $command")
                return Pair(-1, "Command timed out.\nOutput so far:\n$output")
            }

            val exitCode = process.exitValue()
            logger.info("Terraform command completed with exit code $exitCode")
            
            return Pair(exitCode, output)
        } catch (e: Exception) {
            logger.error("Error executing Terraform command", e)
            throw RuntimeException("Failed to execute Terraform command: ${e.message}", e)
        }
    }
    
    fun plan(workingDirectory: String): String {
        val (exitCode, output) = executeTerraformCommand(workingDirectory, "plan -no-color")
        if (exitCode != 0 && exitCode != 2) { // 2 means there are changes
            throw RuntimeException("Terraform plan failed:\n$output")
        }
        return output
    }
    
    fun apply(workingDirectory: String): String {
        val (exitCode, output) = executeTerraformCommand(workingDirectory, "apply -auto-approve -no-color")
        if (exitCode != 0) {
            throw RuntimeException("Terraform apply failed:\n$output")
        }
        return output
    }
}
