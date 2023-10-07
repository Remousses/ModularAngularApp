package com.remousses.app.modular.service.impl;

import com.remousses.app.modular.model.dto.AttributeDto;
import com.remousses.app.modular.model.entity.Attribute;
import com.remousses.app.modular.repository.AttributeRepository;
import com.remousses.app.modular.service.AbstractQueryBuilderService;
import com.remousses.app.modular.service.AttributeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("unused")
@Service
public class AttributeServiceImpl extends AbstractQueryBuilderService<AttributeRepository> implements AttributeService {

    @Override
    @Transactional
    public AttributeDto save(AttributeDto attributeDto) {
        final Attribute attribute = modelMapperCustomize.map(attributeDto, Attribute.class);
        return modelMapperCustomize.map(this.getRepository().save(attribute), AttributeDto.class);
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        this.getRepository().deleteById(id);
    }
}