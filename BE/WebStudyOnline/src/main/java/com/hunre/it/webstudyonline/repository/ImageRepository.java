package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.ImagesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<ImagesEntity, Long> {
//    List<ImagesEntity> findByProductId(Long productId);

}
