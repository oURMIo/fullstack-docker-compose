package com.home.web.dto

import org.springframework.lang.Nullable

data class WebUserEditDto(
    @Nullable
    val firstName: String?,
    @Nullable
    val lastName: String?,
    @Nullable
    val position: String?,
    @Nullable
    val supervisor: String?,
)