package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.BillEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BillRepository extends JpaRepository<BillEntity,Long> {
    @Query(value = "SELECT b FROM BillEntity b WHERE b.deleted=false ")
    Page<BillEntity> findAllByDeletedFalse(Pageable pageable);
}
