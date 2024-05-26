package com.home.web.exeption

class DatabaseException(message: String, exception: Exception = Exception(message)) :
    Exception(message, exception)