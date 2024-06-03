package com.home.web.exception

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.HttpMediaTypeNotSupportedException
import org.springframework.web.bind.MissingServletRequestParameterException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.servlet.resource.NoResourceFoundException

@ControllerAdvice
class GlobalExceptionHandler {
    private val logger: Logger = LoggerFactory.getLogger(GlobalExceptionHandler::class.java)

    @ExceptionHandler(NoResourceFoundException::class)
    fun handleNoResourceFoundException(ex: Exception): ResponseEntity<String> {
        return ResponseEntity("This page is not serving", HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleHttpMessageNotReadableException(ex: Exception): ResponseEntity<String> {
        return createBadRequest("HttpMessageNotReadableException")
    }

    @ExceptionHandler(MissingServletRequestParameterException::class)
    fun handleMissingServletRequestParameterException(ex: Exception): ResponseEntity<String> {
        return createBadRequest("MissingServletRequestParameterException")
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException::class)
    fun handleHttpMediaTypeNotSupportedException(ex: Exception): ResponseEntity<String> {
        logger.warn("Got HttpMediaTypeNotSupportedException")
        return ResponseEntity("Received invalid request type", HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(WebUserNotFoundException::class)
    fun handleUserAppNotFoundException(ex: Exception): ResponseEntity<String> {
        logger.warn("Got UserAppNotFoundException")
        return ResponseEntity("User not found", HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(DatabaseException::class)
    fun handleDatabaseException(ex: Exception): ResponseEntity<String> {
        logger.error("Got DatabaseException , $ex")
        return ResponseEntity("Got issue with database", HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(Exception::class)
    fun handleGlobalExceptions(ex: Exception): ResponseEntity<String> {
        logger.error("Got undefined exception, $ex")
        return ResponseEntity("Unexpectedly, but you broke everything", HttpStatus.INTERNAL_SERVER_ERROR)
    }

    private fun createBadRequest(exceptionName: String): ResponseEntity<String> {
        logger.warn("Got $exceptionName")
        return ResponseEntity("Received invalid request", HttpStatus.BAD_REQUEST)
    }
}