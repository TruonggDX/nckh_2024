package com.hunre.it.webstudyonline.model.dto.auth;


import com.hunre.it.webstudyonline.model.dto.RoleDto;

import java.util.Set;

public class AuthDto {
    private String email;
    private Set<RoleDto> roles;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<RoleDto> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleDto> roles) {
        this.roles = roles;
    }

    public AuthDto() {
    }

}
