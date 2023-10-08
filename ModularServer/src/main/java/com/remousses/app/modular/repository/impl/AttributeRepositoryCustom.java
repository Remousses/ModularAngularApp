package com.remousses.app.modular.repository.impl;

import jakarta.persistence.Tuple;

import java.util.List;

public interface AttributeRepositoryCustom {
    @SuppressWarnings("unused")
    List<Tuple> getCustomQuery(List<String> columns);
}
