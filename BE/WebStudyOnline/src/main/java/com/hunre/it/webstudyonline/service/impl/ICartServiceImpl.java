package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.CartEntity;
import com.hunre.it.webstudyonline.mapper.CartMapper;
import com.hunre.it.webstudyonline.model.dto.CartDto;
import com.hunre.it.webstudyonline.model.request.AddCartForm;
import com.hunre.it.webstudyonline.model.request.UpdateCartForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.CartRepository;
import com.hunre.it.webstudyonline.service.ICartService;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ICartServiceImpl implements ICartService {
    @Autowired
    private CartMapper cartMapper;
    @Autowired
    private CartRepository cartRepository;

    @Override
    public BaseResponse<List<CartDto>> addCart( List<AddCartForm> addCartForms) {
        BaseResponse<List<CartDto>> response = new BaseResponse<>();
        List<CartDto> cartDtos = new ArrayList<>();
        for (AddCartForm addCartForm : addCartForms) {
            Optional<CartEntity> check = null;
            if (addCartForm.getType().equals("Course")){
                check = cartRepository.findByAccountAndCourseId(addCartForm.getAccountId(),addCartForm.getItemId());
            }else if (addCartForm.getType().equals("Roadmap")) {
                check = cartRepository.findByAccountAndRoadmapId(addCartForm.getAccountId(), addCartForm.getItemId());
            }
            if (check.isEmpty()) {
                CartEntity cartEntity = cartMapper.toEntity(addCartForm);
                cartEntity = cartRepository.save(cartEntity);
                cartDtos.add(cartMapper.toDto(cartEntity));
            }
        }
        response.setData(cartDtos);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<CartDto> updateQuantity(String id, UpdateCartForm updateCartForm) {
        BaseResponse<CartDto> response = new BaseResponse<>();

        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long cartId = utils.getT();

        Optional<CartEntity> check = cartRepository.findByAccountAndCartId(updateCartForm.getAccountId(),cartId);
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }

        CartEntity cartEntity = check.get();
        cartEntity = cartMapper.toEntity(cartEntity, updateCartForm);
        cartEntity = cartRepository.save(cartEntity);
        CartDto cartDto = cartMapper.toDto(cartEntity);

        response.setData(cartDto);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<String> deleteCart(String accountId, List<String> cartIds) {
        BaseResponse<String> response = new BaseResponse<>();

        Utils<Long> utils = LongUtils.strToLong(accountId);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long accId = utils.getT();
        for (String strCartId : cartIds) {
            Utils<Long> utilss = LongUtils.strToLong(strCartId);
            Long cartId = utilss.getT();
            if (utilss.getT()== null){
                response.setCode(utils.getCode());
                response.setMessage(utils.getMsg());
                return response;
            }
            Optional<CartEntity> check = cartRepository.findByAccountAndCartId(accId,cartId);
            if (check.isEmpty()){
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
                return response;
            }

            CartEntity cartEntity = check.get();
            cartRepository.delete(cartEntity);
        }
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData("Delete Successfull");
        return response;
    }

    @Override
    public BaseResponse<List<CartDto>> getAllCart(String accountId) {
        BaseResponse<List<CartDto>> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(accountId);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long accId = utils.getT();
        List<CartEntity> cartEntities = cartRepository.findByAccount(accId);
        List<CartDto> cartDtos = cartEntities.stream().map(cartMapper::toDto).collect(Collectors.toList());
        response.setData(cartDtos);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }
}
