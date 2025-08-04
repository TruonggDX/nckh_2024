package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.model.dto.CourseIndex;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import java.util.List;

public interface CourseElasticsearchRepository extends ElasticsearchRepository<CourseIndex, Long> {

  List<CourseIndex> findByNameContainingIgnoreCase(String name);
}