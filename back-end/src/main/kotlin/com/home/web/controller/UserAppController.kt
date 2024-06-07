package com.home.web.controller

import com.home.web.domain.WebUser
import com.home.web.dto.WebUserCreateDto
import com.home.web.dto.WebUserEditDto
import com.home.web.service.WebUserService
import java.util.Optional
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/user")
class UserAppController(
    @Autowired private val webUserService: WebUserService,
) {
    private val logger: Logger = LoggerFactory.getLogger(UserAppController::class.java)

    @GetMapping("", "/")
    fun getUsers(): List<WebUser> {
        logger.trace("Invoke in getUsers")
        return webUserService.getUsers()
    }

    @GetMapping("/{id}")
    fun getUserById(
        @PathVariable id: Long,
    ): ResponseEntity<out Any> {
        logger.trace("Invoke in getUserById(id:$id)")
        val webUser = webUserService.findById(id)
        return if (webUser.isPresent) {
            ResponseEntity(webUser, HttpStatus.OK)
        } else {
            ResponseEntity("User not found", HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping("/by-name")
    fun getUserByFirstname(
        @RequestParam("firstname") firstname: String,
    ): ResponseEntity<out Any> {
        logger.trace("Invoke in getUserByUsername(firstname:$firstname)")
        val userApp = webUserService.findByUsername(firstname)
        return if (userApp.isPresent) {
            ResponseEntity(userApp, HttpStatus.OK)
        } else {
            ResponseEntity("User not found", HttpStatus.BAD_REQUEST)
        }
    }

    @PostMapping("", "/")
    fun createUser(@RequestBody webUserCreateDto: WebUserCreateDto): Optional<WebUser> {
        logger.trace("Invoke createUser(webUserAppDto:{})", webUserCreateDto)
        return webUserService.createUser(
            firstName = webUserCreateDto.firstName,
            lastName = webUserCreateDto.lastName,
            position = webUserCreateDto.position,
            supervisor = webUserCreateDto.supervisor
        )
    }

    @DeleteMapping("/{id}")
    fun deleteUser(@PathVariable id: Long): String {
        logger.trace("Invoke deleteUser(id:$id)")
        webUserService.deleteUserById(id)
        return DONE_STATUS
    }

    @PostMapping("/{id}")
    fun editUser(@PathVariable id: Long, @RequestBody webUserEditDto: WebUserEditDto): WebUser {
        logger.trace("Invoke editUser(webUserEditDto:{})", webUserEditDto)
        return webUserService.updateUser(
            id = id,
            firstName = webUserEditDto.firstName ?: "",
            lastName = webUserEditDto.lastName ?: "",
            position = webUserEditDto.position ?: "",
            supervisor = webUserEditDto.supervisor ?: "",
        )
    }
}

private const val DONE_STATUS = "DONE"
