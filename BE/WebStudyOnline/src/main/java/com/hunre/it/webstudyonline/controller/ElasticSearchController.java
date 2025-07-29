package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.service.ElasticSearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/elastic-search")
public class ElasticSearchController {
  private final ElasticSearchService elasticSearchService;

  public ElasticSearchController(ElasticSearchService elasticSearchService) {
    this.elasticSearchService = elasticSearchService;
  }

  @PostMapping("/sync")
  public ResponseEntity<String> syncCoursesToElasticsearch() {
    elasticSearchService.indexAll();
    return ResponseEntity.ok("Đã đồng bộ course vào Elasticsearch");
  }
}
