package com.hunre.it.webstudyonline.model.dto;



import java.util.HashSet;
import java.util.List;
import java.util.Set;


public class AccountDto {
    private Long id;
    private String username;
    private String password;
    private List<RoleDto> roles ;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<RoleDto> getRoles() {
        return roles;
    }

    public void setRoles(List<RoleDto> roles) {
        this.roles = roles;
    }
}
