package com.home.web.controller

import com.home.web.domain.WebUser
import com.home.web.dto.WebUserCreateDto
import com.home.web.dto.WebUserEditDto
import com.home.web.service.WebUserService
import java.util.Optional
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

private val logger = KotlinLogging.logger {}

@RestController
@RequestMapping("/")
class UserAppController(
    @Autowired private val webUserService: WebUserService,
) {

    @GetMapping
    fun getStatus() = WORK_STATUS

    @GetMapping("users")
    fun getUsers(): List<WebUser> {
        logger.debug { "Invoke in getUsers" }
        return webUserService.getUsers()
    }

    @GetMapping("user")
    fun getUserById(
        @RequestParam("id") id: Long,
    ): ResponseEntity<out Any> {
        logger.debug { "Invoke in getUserById(id:$id)" }
        val webUser = webUserService.findById(id)
        return if (webUser.isPresent) {
            ResponseEntity(webUser, HttpStatus.OK)
        } else {
            ResponseEntity("User not found", HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping("user-by-firstname")
    fun getUserByFirstname(
        @RequestParam("firstname") firstname: String,
    ): ResponseEntity<out Any> {
        logger.debug { "Invoke in getUserByUsername(firstname:$firstname)" }
        val userApp = webUserService.findByUsername(firstname)
        return if (userApp.isPresent) {
            ResponseEntity(userApp, HttpStatus.OK)
        } else {
            ResponseEntity("User not found", HttpStatus.BAD_REQUEST)
        }
    }

    @PostMapping("create")
    fun createUser(@RequestBody webUserCreateDto: WebUserCreateDto): Optional<WebUser> {
        logger.debug { "Invoke createUser(webUserAppDto:$webUserCreateDto)" }
        return webUserService.createUser(
            firstName = webUserCreateDto.firstName,
            lastName = webUserCreateDto.lastName,
            position = webUserCreateDto.position,
            supervisor = webUserCreateDto.supervisor
        )
    }

    @GetMapping("delete")
    fun deleteUser(@RequestParam("id") id: Long): String {
        logger.debug { "Invoke deleteUser(id:$id)" }
        webUserService.deleteUserById(id)
        return DONE_STATUS
    }

    @PostMapping("edit")
    fun editUser(@RequestBody webUserEditDto: WebUserEditDto): WebUser {
        logger.debug { "Invoke editUser(webUserEditDto:$webUserEditDto)" }
        return webUserService.updateUser(
            id = webUserEditDto.id,
            firstName = webUserEditDto.firstName ?: "",
            lastName = webUserEditDto.lastName ?: "",
            position = webUserEditDto.position ?: "",
            supervisor = webUserEditDto.supervisor ?: "",
        )
    }
}

private const val WORK_STATUS = "WORKING"
private const val DONE_STATUS = "DONE"