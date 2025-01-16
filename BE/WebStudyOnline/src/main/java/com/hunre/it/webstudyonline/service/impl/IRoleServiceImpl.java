package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.RoleEntity;
import com.hunre.it.webstudyonline.mapper.RoleMapper;
import com.hunre.it.webstudyonline.model.dto.RoleDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.RoleRepository;
import com.hunre.it.webstudyonline.service.IRoleService;
import com.hunre.it.webstudyonline.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public BaseResponse<RoleDto> addRole(RoleDto role) {
        BaseResponse<RoleDto> response = new BaseResponse<>();
        Optional<RoleEntity> existingRole = roleRepository.findByCode(role.getCode());
        if (existingRole.isPresent()) {
            response.setCode(HttpStatus.CONFLICT.value());
            response.setMessage("Role already exists");
            return response;
        }

        RoleEntity roleEntity = roleMapper.toRoleEntity(role);
        roleEntity = roleRepository.save(roleEntity);
        role.setId(roleEntity.getId());
        response.setData(roleMapper.toDto(roleEntity));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<RoleDto> updateRole(Long id, RoleDto role) {
        BaseResponse<RoleDto> response = new BaseResponse<>();
        Optional<RoleEntity> roleEntity = roleRepository.findById(id);
        if(roleEntity.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }

        RoleEntity roleEntity1 = roleMapper.toRoleEntity(role);
        roleEntity1.setId(id);
        roleEntity1 = roleRepository.save(roleEntity1);
        response.setData(roleMapper.toDto(roleEntity1));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);

        return response;
    }

    @Override
    public BaseResponse<RoleDto> deleteRole(Long id) {
        BaseResponse<RoleDto> response = new BaseResponse<>();
        Optional<RoleEntity> roleEntity = roleRepository.findById(id);
        if(roleEntity.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }

        RoleEntity roleEntity1 = roleEntity.get();
        roleEntity1.setDeleted(true);
        roleRepository.save(roleEntity1);
        response.setData(roleMapper.toDto(roleEntity1));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<RoleDto> getRoleById(Long id) {
        BaseResponse<RoleDto> response = new BaseResponse<>();
        Optional<RoleEntity> roleEntity = roleRepository.findById(id);
        if(roleEntity.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }

        RoleEntity roleEntity1 = roleEntity.get();
        response.setData(roleMapper.toDto(roleEntity1));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }
}
