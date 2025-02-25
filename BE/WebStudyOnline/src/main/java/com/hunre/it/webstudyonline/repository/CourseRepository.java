package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.CategoryEntity;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity,Long> {
    @Query(value = "SELECT c FROM CourseEntity c WHERE c.deleted=false")
    Page<CourseEntity> getAll(Pageable pageable);

    @Query(value = "SELECT c FROM CourseEntity c " +
            "WHERE c.deleted = false " +
            "AND (:status IS NULL or c.status = null) " +
            "AND (:aim IS NULL OR c.aim = :aim) " +
            "AND c.code LIKE %:code% " +
            "AND c.name LIKE %:name% " +
            "AND (:category IS NULL OR c.categoryEntity.id = :category) " +
            "AND (:status IS NULL OR c.status = :status) ")

    Page<CourseEntity> getCourseByCondition(Pageable pageable, String code, String name,
                                            String aim,String category, String status);
    @Query(value = "SELECT c FROM CourseEntity c left join BillDetailsEntity b on c.id = b.courseEntity.id " +
            "group by c.id order by sum(b.quantity) desc")
    Page<CourseEntity> getCourseBestSeller(Pageable pageable);
}
