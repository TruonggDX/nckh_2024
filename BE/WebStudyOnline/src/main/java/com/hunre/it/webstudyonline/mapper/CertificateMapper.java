package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.CertificateEntity;
import com.hunre.it.webstudyonline.model.dto.CertificateDto;
import org.springframework.stereotype.Component;

@Component
public class CertificateMapper {
    public CertificateDto toDto(CertificateEntity certificateEntity) {
        CertificateDto certificateDto = new CertificateDto();
        certificateDto.setId(certificateEntity.getId());
        certificateDto.setCertificateName(certificateEntity.getCertificateName());
        certificateDto.setDescription(certificateEntity.getDescription());
        certificateDto.setIssuingOrganization(certificateEntity.getIssuingOrganization());
        certificateDto.setCertificateType(certificateEntity.getCertificateType());
        certificateDto.setCertificateNumber(certificateEntity.getCertificateNumber());
        certificateDto.setIssueDate(certificateEntity.getIssueDate());
        certificateDto.setCertificateStatus(certificateEntity.getCertificateStatus());
        certificateDto.setTeacherId(certificateEntity.getTeacherEntity().getId());
        return certificateDto;
    }
    public CertificateEntity toEntity(CertificateDto certificateDto) {
        CertificateEntity certificateEntity = new CertificateEntity();
        certificateEntity.setId(certificateDto.getId());
        certificateEntity.setCertificateName(certificateDto.getCertificateName());
        certificateEntity.setDescription(certificateDto.getDescription());
        certificateEntity.setIssuingOrganization(certificateDto.getIssuingOrganization());
        certificateEntity.setCertificateType(certificateDto.getCertificateType());
        certificateEntity.setCertificateNumber(certificateDto.getCertificateNumber());
        certificateEntity.setIssueDate(certificateDto.getIssueDate());
        certificateEntity.setCertificateStatus(certificateDto.getCertificateStatus());
        return certificateEntity;
    }
}
