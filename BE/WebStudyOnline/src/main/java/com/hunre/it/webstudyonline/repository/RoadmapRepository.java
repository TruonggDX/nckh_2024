package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.RoadmapEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoadmapRepository extends JpaRepository<RoadmapEntity, Long> {
    @Query(value = "select c from RoadmapEntity c where c.deleted = false ")
    Page<RoadmapEntity> findAllByDeleted( Pageable pageable);
}
