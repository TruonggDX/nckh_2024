package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.ExamEntity;
import com.hunre.it.webstudyonline.entity.PointEntity;
import com.hunre.it.webstudyonline.model.dto.PointDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PointMapper {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private ExamRepository examRepository;

    public PointDto toDto(PointEntity pointEntity) {
        PointDto pointDto = new PointDto();
        pointDto.setId(pointEntity.getId());
        pointDto.setRankLevel(pointEntity.getRankLevel());
        pointDto.setScore(pointEntity.getScore());
        pointDto.setCompletionTime(pointEntity.getCompletionTime());
        if (pointEntity.getAccountEntity() != null) {
            pointDto.setAccountId(pointEntity.getAccountEntity().getId());
        }
        if (pointEntity.getExamEntity() != null) {
            pointDto.setExamId(pointEntity.getExamEntity().getId());
        }
        return pointDto;
    }

    public PointEntity toEntity(PointDto pointDto) {
        PointEntity pointEntity = new PointEntity();
        pointEntity.setId(pointDto.getId());
        pointEntity.setRankLevel(pointDto.getRankLevel());
        pointEntity.setScore(pointDto.getScore());
        pointEntity.setCompletionTime(pointDto.getCompletionTime());
        Optional<AccountEntity> checkAccId = accountRepository.findById(pointDto.getAccountId());
        if (checkAccId.isEmpty()) {
            throw new RuntimeException("Account not found");
        }
        pointEntity.setAccountEntity(checkAccId.get());
        Optional<ExamEntity> checkExamId = examRepository.findById(pointDto.getExamId());
        if (checkExamId.isEmpty()) {
            throw new RuntimeException("Exam not found");
        }
        pointEntity.setExamEntity(checkExamId.get());
        return pointEntity;
    }
}
