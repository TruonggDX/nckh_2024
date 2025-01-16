package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.RoleDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IRoleService {
    ResponsePage<List<RoleDto>> getAllRoles(Pageable pageable);
    BaseResponse<RoleDto> addRole(RoleDto role);
    BaseResponse<RoleDto> updateRole(Long id ,RoleDto role);
    BaseResponse<RoleDto> deleteRole(Long id);
    BaseResponse<RoleDto> getRoleById(Long id);
}
