package com.hunre.it.webstudyonline.security;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.RoleEntity;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AccountEntity accountEntity = accountRepository.findByUsername(username);
        List<RoleEntity> roleEntity = roleRepository.getRoleByUsername(username);
        if (accountEntity == null) {
            throw new UsernameNotFoundException(username);
        }
        UserDetails userDetails =new org.springframework.security.core.userdetails.User(
                accountEntity.getUsername(),
                accountEntity.getPassword(),
                convertStrToAuthor(roleEntity)
        );
        return userDetails;
    }

    private Collection<? extends GrantedAuthority> convertStrToAuthor(Collection<RoleEntity> roles){
        List<RoleEntity> roleEntities = roles.stream().toList();
        List<SimpleGrantedAuthority> roleConfigSecurity = new ArrayList<>();
        for (int i = 0; i < roles.size(); i++) {
            RoleEntity roleEntity = roleEntities.get(i);
            SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("ROLE_" + roleEntity.getName());
            roleConfigSecurity.add(simpleGrantedAuthority);
        }
        return roleConfigSecurity;
    }
}
