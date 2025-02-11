package com.hunre.it.webstudyonline.model.request;

import com.hunre.it.webstudyonline.model.dto.RoleDto;
import jakarta.validation.constraints.NotBlank;

import java.util.Set;

public class UpdateAccountForm {
    @NotBlank(message = "Please enter full name")
    private String fullName;
    private Set<String> roleCode ;
    private String imageUrl;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Set<String> getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(Set<String> roleCode) {
        this.roleCode = roleCode;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
