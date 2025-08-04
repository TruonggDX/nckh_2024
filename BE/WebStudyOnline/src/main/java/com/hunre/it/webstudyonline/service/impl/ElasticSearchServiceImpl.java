package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.model.dto.CourseIndex;
import com.hunre.it.webstudyonline.repository.CourseElasticsearchRepository;
import com.hunre.it.webstudyonline.repository.CourseRepository;
import com.hunre.it.webstudyonline.service.ElasticSearchService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ElasticSearchServiceImpl implements ElasticSearchService {

  private final CourseRepository courseRepository;
  private final CourseElasticsearchRepository courseESRepo;

  public ElasticSearchServiceImpl(CourseRepository courseRepository,
      CourseElasticsearchRepository courseESRepo) {
    this.courseRepository = courseRepository;
    this.courseESRepo = courseESRepo;
  }

  @Override
  public void indexAll() {
    List<CourseEntity> courses = courseRepository.getAllDeletedCourses();
    List<CourseIndex> indexList = courses.stream().map(course -> {
      CourseIndex courseIndex = new CourseIndex();
      courseIndex.setId(course.getId());
      courseIndex.setName(course.getName());
      courseIndex.setCode(course.getCode());
      courseIndex.setDescription(course.getDescription());
      courseIndex.setStatus(course.getStatus());
      courseIndex.setDiscount(course.getDiscount());
      courseIndex.setAim(course.getAim());
      courseIndex.setPrice(course.getPrice());
      courseIndex.setImageUrl(courseIndex.getImageUrl());
      return courseIndex;
    }).toList();

    courseESRepo.saveAll(indexList);
  }

}
