package com.remousses.app.modular.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.remousses.app.modular.model.dto.CustomComponentDto;
import com.remousses.app.modular.model.dto.ComponentSizeDto;
import com.remousses.app.modular.model.entity.CustomComponent;
import com.remousses.app.modular.repository.CustomComponentRepository;
import com.remousses.app.modular.service.AbstractQueryBuilderService;
import com.remousses.app.modular.service.CustomComponentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("unused")
@Service
public class CustomComponentServiceImpl extends AbstractQueryBuilderService<CustomComponentRepository> implements CustomComponentService {

    @Override
    @Transactional
    public CustomComponentDto save(CustomComponentDto customComponentDto) {
        final var customComponent = modelMapperCustomize.map(customComponentDto, CustomComponent.class);
        return modelMapperCustomize.map(this.getRepository().save(customComponent), CustomComponentDto.class);
    }

    @Override
    @Transactional
    public CustomComponentDto savePosition(Integer id, JsonNode dropPoint) {
        final var customComponentOpt = this.getRepository().findById(id);

        if (customComponentOpt.isPresent()) {
            final var customComponent = customComponentOpt.get();
            customComponent.setDropPoint(dropPoint);
            return modelMapperCustomize.map(this.getRepository().save(customComponent), CustomComponentDto.class);
        }

        return null;
    }

    @Override
    @Transactional
    public CustomComponentDto saveSize(Integer id, ComponentSizeDto size) {
        final var customComponentOpt = this.getRepository().findById(id);

        if (customComponentOpt.isPresent()) {
            final var customComponent = customComponentOpt.get();
            customComponent.setWidth(size.width());
            customComponent.setHeight(size.height());
            return modelMapperCustomize.map(this.getRepository().save(customComponent), CustomComponentDto.class);
        }

        return null;
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        this.getRepository().deleteById(id);
    }
}