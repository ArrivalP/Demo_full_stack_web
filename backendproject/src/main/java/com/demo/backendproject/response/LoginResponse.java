package com.demo.backendproject.response;

public class LoginResponse {
    String message;
    Boolean status;
    private Integer userId;
    private String name;


    public LoginResponse(String message,  Boolean status, Integer userId,String name) {
        this.message = message;
        this.status = status;
        this.userId = userId;
        this.name = name;

    }

    public LoginResponse() {

    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getStatus() {
        return status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
    public String toString() {
        return "LoginResponse{" +
                "message='" + message + '\'' +
                ", status=" + status +
                ", userId=" + userId +
                '}';
    }

}
