package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.BillDetailsEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BillDetailsRepository extends JpaRepository<BillDetailsEntity,Long> {
    @Query(value = "SELECT b FROM BillDetailsEntity b WHERE b.deleted=false AND b.billEntity.id =:billId")
    Page<BillDetailsEntity> getByBillId(@Param("billId") Long billId, Pageable pageable);
}
