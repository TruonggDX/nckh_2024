package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity,Long> {
    AccountEntity findByUsername(String username);
}
