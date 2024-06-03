package com.home.web.exception

class DatabaseException(message: String, exception: Exception = Exception(message)) :
    Exception(message, exception)