package com.home.web.exception

class WebUserNotFoundException(message: String, exception: Exception = Exception(message)) :
    Exception(message, exception)