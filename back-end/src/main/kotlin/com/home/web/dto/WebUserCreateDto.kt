package com.home.web.dto

import org.springframework.lang.Nullable

data class WebUserCreateDto(
    val firstName: String,
    val lastName: String,
    val position: String,
    @Nullable
    val supervisor: String,
)