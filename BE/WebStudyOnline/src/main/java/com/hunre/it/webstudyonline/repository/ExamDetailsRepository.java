package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.ExamDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExamDetailsRepository extends JpaRepository<ExamDetailsEntity,Long> {
    @Query(value = "SELECT e FROM ExamDetailsEntity e WHERE e.examEntity.id =:examId AND e.deleted=false ")
    List<ExamDetailsEntity> findAllExamDetailsByExamId(Long examId);
}
