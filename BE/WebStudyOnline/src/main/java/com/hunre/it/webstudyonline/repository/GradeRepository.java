package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.GradeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeRepository extends JpaRepository<GradeEntity, Long> {
    @Query(value = "select g from GradeEntity g where g.deleted = false and g.deleted = false ")
    Page<GradeEntity> getGrade (Pageable pageable);
}
