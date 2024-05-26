package com.home.web.domain

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime

@Entity
@Table(name = "users")
data class WebUser(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = 0,

    @Column(name = "first_name")
    var firstName: String = "",

    @Column(name = "last_name")
    var lastName: String = "",

    @Column(name = "position")
    var position: String = "",

    @Column(name = "supervisor")
    var supervisor: String = "",

    @Column(name = "creation_date")
    var creationDate: LocalDateTime = LocalDateTime.now(),
) {
    constructor() : this(
        id = 0,
        firstName = "",
        lastName = "",
        position = "",
        supervisor = "",
        creationDate = LocalDateTime.now()
    )
}
