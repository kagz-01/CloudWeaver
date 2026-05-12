package com.cloudweaver.api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CloudWeaverApplication

fun main(args: Array<String>) {
    runApplication<CloudWeaverApplication>(*args)
}
