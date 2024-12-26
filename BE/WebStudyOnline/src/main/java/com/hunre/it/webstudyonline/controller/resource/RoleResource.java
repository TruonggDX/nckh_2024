package com.hunre.it.webstudyonline.controller.resource;

import com.hunre.it.webstudyonline.model.dto.RoleDto;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.IRoleService;
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

    @GetMapping
    public ResponseEntity<ResponsePage<List<RoleDto>>> getAll(Pageable pageable) {
        ResponsePage<List<RoleDto>> responsePage = roleService.getAllRoles(pageable);
        return ResponseEntity.ok(responsePage);
    }
}
