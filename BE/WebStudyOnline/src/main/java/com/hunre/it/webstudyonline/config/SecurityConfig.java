package com.hunre.it.webstudyonline.config;

import com.hunre.it.webstudyonline.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder builder) {
        try {
            builder.userDetailsService(customUserDetailsService)
                    .passwordEncoder(passwordEncoder());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        //config url pages
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/dashbroad/**").hasAnyRole("USER")
                        .requestMatchers("/", "/login").permitAll()
                        .requestMatchers("/account/**").permitAll()
                        .requestMatchers("/api/role/**").permitAll()


                        //config admin


                        //config user


                        //common
                        .requestMatchers("/process-after-login").hasAnyRole("ADMIN", "USER", "TEACHER", "CENSOR")

                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/authentication")
                        .defaultSuccessUrl("/process-after-login")
                        .failureUrl("/login?error=true")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        .logoutSuccessUrl("/login")
                );
        return http.build();
    }


    @Bean
    WebSecurityCustomizer webSecurityCustomizer() {
        return (web -> web.ignoring()
                .requestMatchers("/admin/**", "/auth/**", "/user/**")
        );
    }

    public static void main(String[] args) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println(passwordEncoder.encode("admin"));
    }
}
