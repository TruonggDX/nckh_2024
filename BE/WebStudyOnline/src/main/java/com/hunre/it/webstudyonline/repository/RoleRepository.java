package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RoleRepository extends JpaRepository<RoleEntity,Long> {
    RoleEntity findByName(String name);
}
