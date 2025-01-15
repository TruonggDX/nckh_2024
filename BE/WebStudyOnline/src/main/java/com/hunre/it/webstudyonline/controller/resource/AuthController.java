package com.hunre.it.webstudyonline.controller.resource;


import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.mapper.AccountMapper;
import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.dto.auth.AuthDto;
import com.hunre.it.webstudyonline.model.dto.auth.LoginUserDto;
import com.hunre.it.webstudyonline.model.dto.auth.RegisterUserDto;
import com.hunre.it.webstudyonline.model.dto.auth.VerifyUserDto;
import com.hunre.it.webstudyonline.model.response.LoginResponse;
import com.hunre.it.webstudyonline.security.service.JwtService;
import com.hunre.it.webstudyonline.service.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private IAuthService iAuthService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountMapper accountMapper;


    @PostMapping("/signup")
    public ResponseEntity<RegisterUserDto> signup(@RequestBody RegisterUserDto input) {
        RegisterUserDto userDTO = iAuthService.signup(input);
        return ResponseEntity.ok(userDTO);
    }



    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {

        AccountEntity authenticatedUser = iAuthService.authenticate(loginUserDto);
        AccountDto accountDto = accountMapper.toDto(authenticatedUser);
        String jwtToken = jwtService.generateToken(accountDto);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }


    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
        try {
            iAuthService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account verified successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/decode-token")
    public ResponseEntity<AuthDto> decodeToken() {
        AuthDto decodedClaims = jwtService.decodeToken();
        return ResponseEntity.ok(decodedClaims);
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        try {
            iAuthService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

