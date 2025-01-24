package com.hunre.it.webstudyonline.service.impl;


import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.map.IMap;
import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.RoleEntity;
import com.hunre.it.webstudyonline.mapper.AuthMapper;
import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.dto.auth.LoginUserDto;
import com.hunre.it.webstudyonline.model.dto.auth.RegisterUserDto;
import com.hunre.it.webstudyonline.model.dto.auth.VerifyUserDto;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.RoleRepository;
import com.hunre.it.webstudyonline.service.IAuthService;
import com.hunre.it.webstudyonline.service.IEmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class IAuthServiceImpl implements IAuthService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AuthMapper authMapper;
    @Autowired
    private IEmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    @Qualifier("hazelcastServerInstance")
    private HazelcastInstance hazelcastInstance;


    @Override
    public RegisterUserDto signup(RegisterUserDto registerUserDto) {
        AccountEntity account = new AccountEntity(
                registerUserDto.getCode(),
                registerUserDto.getFullname(),
                passwordEncoder.encode(registerUserDto.getPassword()),
                registerUserDto.getEmail(),
                registerUserDto.getPhone()
        );
        account.setEnabled(false);
        account.setDeleted(false);
        Set<RoleEntity> roles = registerUserDto.getRoleIds().stream().map(
                roleId -> roleRepository.findById(roleId).orElseThrow(() -> new UsernameNotFoundException("Role not found"))
        ).collect(Collectors.toSet());
        account.setRoles(roles);
        String verificationCode = generateVerificationCode();

        IMap<String, String> otpMap = hazelcastInstance.getMap("otpCodes");
        otpMap.put(registerUserDto.getEmail(), verificationCode, 60, TimeUnit.SECONDS);
        try {
            sendVerificationEmail(account, verificationCode);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send verification email", e);
        }
        return authMapper.convertToDTO(accountRepository.save(account));
    }

    @Override
    public AccountEntity authenticate(LoginUserDto loginUserDto) {
        AccountEntity user = accountRepository.findByEmail(loginUserDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.isEnabled()) {
            throw new RuntimeException("Account not verified. Please verify your account.");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserDto.getEmail(),
                        loginUserDto.getPassword()
                )
        );
        return user;
    }

    @Override
    public void verifyUser(VerifyUserDto verifyUserDto) {
        Optional<AccountEntity> optionalUser = accountRepository.findByEmail(verifyUserDto.getEmail());
        if (optionalUser.isEmpty()){
            throw new RuntimeException("User not found");
        }
        AccountEntity user = optionalUser.get();
        IMap<String, String> otpMap = hazelcastInstance.getMap("otpCodes");
        String storedCode = otpMap.get(verifyUserDto.getEmail());
        if (storedCode == null || !storedCode.equals(verifyUserDto.getVerificationCode())){
            throw new RuntimeException("Invalid or expired verification code");
        }
        user.setEnabled(true);
        accountRepository.save(user);
    }

    @Override
    public void resendVerificationCode(String email) {
        Optional<AccountEntity> optionalUser = accountRepository.findByEmail(email);
        if (optionalUser.isEmpty()){
            throw new RuntimeException("User not found");
        }

        AccountEntity user = optionalUser.get();
        if (user.isEnabled()) {
            throw new RuntimeException("Account is already verified");
        }
        IMap<String, String> otpMap = hazelcastInstance.getMap("otpCodes");
        String verificationCode = otpMap.get(email);
        if (verificationCode == null) {
            verificationCode = generateVerificationCode();
            otpMap.put(email, verificationCode, 60, TimeUnit.SECONDS);
        }
        try {
            sendVerificationEmail(user, verificationCode);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send verification email", e);
        }

    }

    @Override
    public void sendVerificationEmail(AccountEntity account, String verificationCode) {
        String subject = "Account Verification";
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(account.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }

}
