package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.CertificateEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificateRepository extends JpaRepository<CertificateEntity,Long> {
    @Query(value = "SELECT c FROM CertificateEntity c WHERE c.deleted=false ")
    Page<CertificateEntity> findAllByDeletedFalse(Pageable pageable);

    @Query(value = "SELECT c FROM CertificateEntity c WHERE c.deleted=false " +
            "AND (:certificateName IS NULL OR c.certificateName LIKE %:certificateName%)" +
            "AND (:issuingOrganization IS NULL OR c.issuingOrganization LIKE %:issuingOrganization%)" +
            "AND (:certificateType IS NULL OR c.certificateType LIKE %:certificateType%)" +
            "AND (:certificateNumber IS NULL OR c.certificateNumber LIKE %:certificateNumber%)" +
            "AND (:certificateStatus IS NULL OR c.certificateStatus LIKE %:certificateStatus%)")
    Page<CertificateEntity> findCertificateByAttribute(String certificateName,String issuingOrganization,String certificateType,String certificateNumber,String certificateStatus,Pageable pageable);
}
