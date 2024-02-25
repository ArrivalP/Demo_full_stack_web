package com.demo.backendproject.Dto;


public class UpdateDto {
    private String name;

    private String email;
    private String oldPassword;
    private String newPassword;

    public UpdateDto() {
    }

    public UpdateDto(String name, String email, String oldPassword, String newPassword) {
        this.name = name;
        this.email = email;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
