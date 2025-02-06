package com.hunre.it.webstudyonline.controller.api;

import com.hunre.it.webstudyonline.model.dto.RoadmapDto;
import com.hunre.it.webstudyonline.model.request.AddRoadmapForm;
import com.hunre.it.webstudyonline.model.request.UpdateRoadmapForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.IRoadmapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roadmap")
public class ApiRoadmap {
    @Autowired
    private IRoadmapService roadmapService;
    @GetMapping()
    public ResponseEntity<ResponsePage<List<RoadmapDto>>> getRoadmap(Pageable pageable) {
        ResponsePage<List<RoadmapDto>> responsePage = roadmapService.getRoadmap(pageable);
        return ResponseEntity.ok(responsePage);
    }
    @PostMapping("/add")
    public ResponseEntity<BaseResponse<RoadmapDto>> addRoadmap(@RequestBody AddRoadmapForm addRoadmapForm) {
        BaseResponse<RoadmapDto> baseResponse = roadmapService.addRoadmap(addRoadmapForm);
        return ResponseEntity.ok(baseResponse);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<RoadmapDto>> updateRoadmap(@PathVariable("id") String id, @RequestBody UpdateRoadmapForm updateRoadmapForm) {
        BaseResponse<RoadmapDto> response = roadmapService.updateRoadmap(id, updateRoadmapForm);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse> deleteRoadmap(@PathVariable("id") String id) {
        BaseResponse baseResponse = roadmapService.deleteRoadmap(id);
        return ResponseEntity.ok(baseResponse);
    }
}
