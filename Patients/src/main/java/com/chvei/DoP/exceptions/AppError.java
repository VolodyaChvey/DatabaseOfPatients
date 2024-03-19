package com.chvei.DoP.exceptions;

public class AppError {
    private String statusText;
    private String message;

    public AppError() {
    }

    public AppError(String statusText, String message) {
        this.statusText = statusText;
        this.message = message;
    }

    public String getStatusText() {
        return statusText;
    }

    public void setStatusText(String statusText) {
        this.statusText = statusText;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
