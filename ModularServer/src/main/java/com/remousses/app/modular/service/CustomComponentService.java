package com.remousses.app.modular.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.remousses.app.modular.model.dto.CustomComponentDto;

public interface CustomComponentService {

    CustomComponentDto save(CustomComponentDto customComponentDto);

    CustomComponentDto savePosition(Integer id, JsonNode dropPoint);

    void deleteById(Integer id);
}