package com.cloudweaver.api.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/health")
class HealthController {

    @GetMapping
    fun health(): Map<String, String> {
        return mapOf("status" to "UP", "message" to "CloudWeaver API is operational")
    }
}
