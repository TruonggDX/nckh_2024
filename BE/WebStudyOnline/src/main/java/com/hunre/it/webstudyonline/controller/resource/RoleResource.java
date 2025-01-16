package com.hunre.it.webstudyonline.controller.resource;

import com.hunre.it.webstudyonline.model.dto.RoleDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.IRoleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/role")
public class RoleResource {
    @Autowired
    private IRoleService roleService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<RoleDto>>> getAll(Pageable pageable) {
        ResponsePage<List<RoleDto>> responsePage = roleService.getAllRoles(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @PostMapping("/create")
    public ResponseEntity<BaseResponse<RoleDto>> createRole(@Valid @RequestBody RoleDto roleDto) {
        BaseResponse<RoleDto> baseResponse = roleService.addRole(roleDto);
        return  ResponseEntity.ok(baseResponse);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<RoleDto>> updateRole(@Valid @RequestBody RoleDto roleDto, @PathVariable Long id) {
        BaseResponse<RoleDto> baseResponse = roleService.updateRole(id,roleDto);
        return ResponseEntity.ok(baseResponse);
    }



    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<RoleDto>> getRoleById(@PathVariable Long id) {
        BaseResponse<RoleDto> response = roleService.getRoleById(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delele/{id}")
    public ResponseEntity<BaseResponse<RoleDto>> deleteRole(@PathVariable Long id) {
        BaseResponse<RoleDto> response = roleService.deleteRole(id);
        return ResponseEntity.ok(response);
    }
}
