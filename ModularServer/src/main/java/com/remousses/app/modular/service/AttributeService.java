package com.remousses.app.modular.service;

import com.remousses.app.modular.model.dto.AttributeDto;

public interface AttributeService {

    AttributeDto save(AttributeDto attributeDto);

    void deleteById(Integer id);
}