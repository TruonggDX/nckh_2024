package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.CourseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity,Long> {
    @Query(value = "SELECT c FROM CourseEntity c WHERE c.deleted=false ")
    Page<CourseEntity> getAll(Pageable pageable);
}
