package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.BillDetailsEntity;
import com.hunre.it.webstudyonline.mapper.BillDetailsMapper;
import com.hunre.it.webstudyonline.model.dto.BillDetailsDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.BillDetailsRepository;
import com.hunre.it.webstudyonline.service.IBillDetailsService;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IBillDetailsServiceImpl implements IBillDetailsService {
    @Autowired
    private BillDetailsRepository billDetailsRepository;
    @Autowired
    private BillDetailsMapper billDetailsMapper;
    @Override
    public ResponsePage<List<BillDetailsDto>> getAllBillDetails(String billId, Pageable pageable) {
        ResponsePage<List<BillDetailsDto>> responsePage = new ResponsePage<>();
        Utils<Long> utils = LongUtils.strToLong(billId);
        Long billIdLong = utils.getT();
        Page<BillDetailsEntity> billDetailsPage = billDetailsRepository.getByBillId(billIdLong, pageable);
        List<BillDetailsDto> billDetailsDtos = billDetailsPage.getContent()
                .stream()
                .map(billDetailsMapper::toDto)
                .collect(Collectors.toList());
        responsePage.setContent(billDetailsDtos);
        responsePage.setPageNumber(billDetailsPage.getNumber());
        responsePage.setPageSize(billDetailsPage.getSize());
        responsePage.setTotalElements(billDetailsPage.getTotalElements());
        responsePage.setTotalPages(billDetailsPage.getTotalPages());

        return responsePage;
    }

    @Override
    public BaseResponse<BillDetailsDto> createBillDetails(BillDetailsDto billDetailsDto) {
        BaseResponse<BillDetailsDto> response = new BaseResponse<>();
        BillDetailsEntity billDetailsEntity = billDetailsMapper.toEntity(billDetailsDto);
        billDetailsEntity.setDeleted(false);
        billDetailsEntity = billDetailsRepository.save(billDetailsEntity);
        response.setData(billDetailsMapper.toDto(billDetailsEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.CREATED.value());
        return response;
    }
}
