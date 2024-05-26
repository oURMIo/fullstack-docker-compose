package com.home.web.repository

import com.home.web.domain.WebUser
import java.util.Optional
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface WebUserRepository : CrudRepository<WebUser, Long> {
    fun findByFirstName(username: String): List<WebUser>
    fun findFirstByFirstName(username: String): Optional<WebUser>
}
