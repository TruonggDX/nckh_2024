package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartEntity,Long> {
    @Query("select c from CartEntity c where c.account.id =:accId and c.id =:cartId and c.account.deleted = false ")
    Optional<CartEntity> findByAccountAndCartId(Long accId,Long cartId);

    @Query("select c from CartEntity c where c.account.id =:accId and c.account.deleted = false ")
    List<CartEntity> findByAccount(Long accId);

    @Query("select c from CartEntity c where c.account.id =:accId and c.course.id =:courseId and c.account.deleted = false ")
    Optional<CartEntity> findByAccountAndCourseId(Long accId,Long courseId);
    @Query("select c from CartEntity c where c.account.id =:accId and c.roadmap.id =:roadmapId and c.account.deleted = false ")
    Optional<CartEntity> findByAccountAndRoadmapId(Long accId,Long roadmapId);
}
