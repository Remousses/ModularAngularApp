package com.remousses.app.modular.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.remousses.app.modular.model.dto.CustomComponentDto;
import com.remousses.app.modular.model.entity.CustomComponent;
import com.remousses.app.modular.repository.CustomComponentRepository;
import com.remousses.app.modular.service.AbstractQueryBuilderService;
import com.remousses.app.modular.service.CustomComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@SuppressWarnings("unused")
@Service
public class CustomComponentServiceImpl extends AbstractQueryBuilderService<CustomComponentRepository> implements CustomComponentService {
    @Autowired
    CustomComponentRepository customComponentRepository;

    @Override
    @Transactional
    public CustomComponentDto save(CustomComponentDto customComponentDto) {
        final CustomComponent customComponent = modelMapperCustomize.map(customComponentDto, CustomComponent.class);
        return modelMapperCustomize.map(customComponentRepository.save(customComponent), CustomComponentDto.class);
    }

    @Override
    @Transactional
    public CustomComponentDto savePosition(Integer id, JsonNode dropPoint) {
        final Optional<CustomComponent> customComponentOpt = customComponentRepository.findById(id);

        if (customComponentOpt.isPresent()) {
            customComponentOpt.get().setDropPoint(dropPoint);
            return modelMapperCustomize.map(customComponentRepository.save(customComponentOpt.get()), CustomComponentDto.class);
        }

        return null;
    }
}