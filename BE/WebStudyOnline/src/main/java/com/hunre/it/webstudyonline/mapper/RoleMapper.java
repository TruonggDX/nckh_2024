package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.RoleEntity;
import com.hunre.it.webstudyonline.model.dto.RoleDto;
import org.mapstruct.Mapper;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleDto toDto(RoleEntity roleEntity);
    RoleEntity toEntity(RoleDto roleDto);

    default Set<RoleDto> toDtoSet(Set<RoleEntity> roleEntitySet) {
        return  roleEntitySet.stream().map(this::toDto).collect(Collectors.toSet());
    }
    default Set<RoleEntity> toEntitySet(Set<RoleDto> roleDtoSet) {
        return roleDtoSet.stream().map(this::toEntity).collect(Collectors.toSet());
    }
}
