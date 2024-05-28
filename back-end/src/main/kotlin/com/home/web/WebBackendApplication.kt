package com.home.web

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class WebBackendApplication

fun main(args: Array<String>) {
	runApplication<WebBackendApplication>(*args)
}
