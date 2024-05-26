package com.home.web.service

import com.home.web.domain.WebUser
import com.home.web.exeption.DatabaseException
import com.home.web.exeption.WebUserNotFoundException
import com.home.web.repository.WebUserRepository
import java.util.Optional
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service


private val logger = KotlinLogging.logger {}

@Service
class WebUserService(
    @Autowired
    private val webUserRepository: WebUserRepository,
) {

    fun getUsers(): List<WebUser> {
        try {
            return webUserRepository.findAll().toList()
        } catch (e: DatabaseException) {
            logger.error { "Got issue in getUsers, $e" }
            return listOf()
        }
    }

    fun findById(userId: Long): Optional<WebUser> {
        try {
            return webUserRepository.findById(userId)
        } catch (e: DatabaseException) {
            logger.error { "Got issue in getUsers(userId:$userId), $e" }
            return Optional.empty()
        }
    }

    fun findByUsername(username: String): Optional<WebUser> {
        try {
            return webUserRepository.findFirstByFirstName(username)
        } catch (e: DatabaseException) {
            logger.error { "Got issue in findByUsername(username:$username), $e" }
            return Optional.empty()
        }
    }

    fun createUser(firstName: String, lastName: String, position: String, supervisor: String): Optional<WebUser> {
        val userApp = WebUser(
            firstName = firstName,
            lastName = lastName,
            position = position,
            supervisor = supervisor,
        )
        try {
            return Optional.of(webUserRepository.save(userApp))
        } catch (e: DatabaseException) {
            logger.error {
                "Got issue in createUser(firstName:$firstName, lastName:$lastName, " +
                        "position:$position, supervisor:$supervisor), $e"
            }
            return Optional.empty()
        }
    }

    fun updateUser(id: Long, firstName: String, lastName: String, position: String, supervisor: String): WebUser {
        val webUser: WebUser = webUserRepository.findById(id)
            .orElseThrow { WebUserNotFoundException("Don't have user with id:$id") }
        if (firstName != "") {
            webUser.firstName = firstName
        }
        if (lastName != "") {
            webUser.lastName = lastName
        }
        if (position != "") {
            webUser.position = position
        }
        if (supervisor != "") {
            webUser.supervisor = supervisor
        }
        return webUserRepository.save(webUser)
    }

    fun deleteUserById(userId: Long) {
        try {
            webUserRepository.deleteById(userId)
        } catch (e: DatabaseException) {
            logger.error { "Got issue in deleteUserById, $e" }
        }
    }
}