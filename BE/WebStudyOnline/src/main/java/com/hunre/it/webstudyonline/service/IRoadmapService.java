package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.entity.RoadmapEntity;
import com.hunre.it.webstudyonline.model.dto.RoadmapDto;
import com.hunre.it.webstudyonline.model.request.AddRoadmapForm;
import com.hunre.it.webstudyonline.model.request.UpdateRoadmapForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IRoadmapService {
    BaseResponse<RoadmapDto> addRoadmap(AddRoadmapForm addRoadmapForm);
    ResponsePage<List<RoadmapDto>> getRoadmap(Pageable pageable);
    BaseResponse<RoadmapDto> updateRoadmap(String id,UpdateRoadmapForm updateRoadmapForm);
    BaseResponse<RoadmapDto> deleteRoadmap(String id);
}
