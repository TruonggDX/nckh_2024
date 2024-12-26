package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.RoleEntity;
import com.hunre.it.webstudyonline.mapper.RoleMapper;
import com.hunre.it.webstudyonline.model.dto.RoleDto;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.RoleRepository;
import com.hunre.it.webstudyonline.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IRoleServiceImpl implements IRoleService {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RoleMapper roleMapper;

    @Override
    public ResponsePage<List<RoleDto>> getAllRoles(Pageable pageable) {
        ResponsePage<List<RoleDto>> responsePage = new ResponsePage<>();
        Page<RoleEntity> roles = roleRepository.findAll(pageable);
        List<RoleDto> roleDtos = roles.getContent().stream().map(roleMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(roles.getTotalElements());
        responsePage.setTotalPages(roles.getTotalPages());
        responsePage.setContent(roleDtos);
        return responsePage;
    }
}
