package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.GradeEntity;
import com.hunre.it.webstudyonline.mapper.GradeMapper;
import com.hunre.it.webstudyonline.model.dto.GradeDto;
import com.hunre.it.webstudyonline.model.dto.auth.AuthDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.GradeRepository;
import com.hunre.it.webstudyonline.security.service.JwtService;
import com.hunre.it.webstudyonline.service.IGradeService;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class IGradeServiceImpl implements IGradeService {
    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    private GradeMapper gradeMapper;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public ResponsePage<List<GradeDto>> getAllGrades(Pageable pageable) {
        ResponsePage<List<GradeDto>> responsePage = new ResponsePage<>();
        Page<GradeEntity> page = gradeRepository.getGrade(pageable);
        List<GradeDto> gradeDtos = page.getContent().stream().map(gradeMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements((page.getTotalElements()));
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(gradeDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<GradeDto> getGradeById(String id) {
        BaseResponse<GradeDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if(utils.getT() == null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long gradeId = utils.getT();
        Optional<GradeEntity> grade = gradeRepository.findById(gradeId);
        if(grade.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        GradeDto gradeDto = gradeMapper.toDto(grade.get());
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(gradeDto);

        return response;
    }

    @Override
    public BaseResponse<GradeDto> addGrade(GradeDto gradeDto) {
        BaseResponse<GradeDto> response = new BaseResponse<>();
        GradeEntity gradeEntity = gradeMapper.toEntity(gradeDto);
        gradeEntity.setDeleted(false);
        gradeRepository.save(gradeEntity);
        response.setData(gradeMapper.toDto(gradeEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.CREATED.value());
        return response;
    }

    @Override
    public BaseResponse<GradeDto> updateGrade(String id, GradeDto gradeDto) {
        BaseResponse<GradeDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long gradeId = utils.getT();
        Optional<GradeEntity> grade = gradeRepository.findById(gradeId);
        if (grade.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Grade Not Found");
            return response;
        }
        GradeEntity gradeEntity = gradeMapper.toEntity(gradeDto);
        gradeEntity.setDeleted(false);
        gradeEntity.setId(gradeId);
        gradeRepository.save(gradeEntity);
        response.setData(gradeMapper.toDto(gradeEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<GradeDto> deleteGrade(String id) {
        BaseResponse<GradeDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long gradeId = utils.getT();
        Optional<GradeEntity> grade = gradeRepository.findById(gradeId);
        if (grade.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Grade Not Found");
            return response;
        }
        GradeEntity gradeEntity = grade.get();
        gradeEntity.setDeleted(true);
        gradeRepository.save(gradeEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(gradeMapper.toDto(gradeEntity));
        return response;
    }

    @Override
    public BaseResponse<List<GradeDto>> getGradeByEmail() {
        BaseResponse<List<GradeDto>> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        List<GradeEntity> gradeEntities = accountRepository.findGradesByEmail(email);
        List<GradeDto> gradeDtos = gradeEntities.stream().map(gradeMapper::toDto).toList();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(gradeDtos);
        return response;
    }
}
