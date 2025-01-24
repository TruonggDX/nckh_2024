package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.InforTeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InforTeacherRepository extends JpaRepository<InforTeacherEntity,Long> {
}
