package com.home.web.exeption

class WebUserNotFoundException(message: String, exception: Exception = Exception(message)) :
    Exception(message, exception)