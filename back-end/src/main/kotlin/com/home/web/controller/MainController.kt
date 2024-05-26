package com.home.web.controller

import org.springframework.beans.factory.annotation.Value
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/home")
class MainController(
    @Value("\${spring.application.name}")
    private val appName: String,
) {
    @GetMapping
    fun homePage(model: Model): String {
        model.addAttribute("appName", appName)
        return "$appName is working!"
    }
}