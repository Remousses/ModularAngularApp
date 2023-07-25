package com.remousses.app.modular.service.impl;

import com.remousses.app.modular.component.ModelMapperCustomize;
import com.remousses.app.modular.model.dto.CustomComponentDto;
import com.remousses.app.modular.model.entity.CustomComponent;
import com.remousses.app.modular.repository.CustomComponentRepository;
import com.remousses.app.modular.service.CustomComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomComponentServiceImpl implements CustomComponentService {
    @Autowired
    CustomComponentRepository customComponentRepository;

    @Autowired
    ModelMapperCustomize modelMapperCustomize;

    @Transactional
    public CustomComponentDto save(CustomComponentDto customComponentDto) {
        final CustomComponent customComponent = modelMapperCustomize.map(customComponentDto, CustomComponent.class);
        return modelMapperCustomize.map(customComponentRepository.save(customComponent), CustomComponentDto.class);
    }
}