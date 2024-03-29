package com.chvei.DoP.controllers;

import com.chvei.DoP.exceptions.AppError;
import com.chvei.DoP.exceptions.ResourceNotFoundException;
import com.chvei.DoP.exceptions.UnacceptableActionException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.logging.Level;
import java.util.logging.Logger;

@ControllerAdvice
public class GlobalExceptionHandler {
    private final Logger logger = Logger.getLogger(GlobalExceptionHandler.class.getName());

    @ExceptionHandler
    public ResponseEntity<AppError> catchResourceNotFoundException(ResourceNotFoundException e) {
        logger.log(Level.INFO, e.getMessage());
        return new ResponseEntity<>(new AppError(HttpStatus.NOT_FOUND.toString(), e.getMessage()), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler
    public ResponseEntity<AppError> catchUnacceptableActionException(UnacceptableActionException e){
        logger.log(Level.INFO, e.getMessage());
        return new ResponseEntity<>(new AppError(HttpStatus.FORBIDDEN.toString(), e.getMessage()),HttpStatus.FORBIDDEN);
    }
}
