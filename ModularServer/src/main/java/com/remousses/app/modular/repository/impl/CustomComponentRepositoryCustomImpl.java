package com.remousses.app.modular.repository.impl;

import com.remousses.app.modular.model.entity.CustomComponent;
import com.remousses.app.modular.repository.AbstractQueryBuilderRepository;
import jakarta.persistence.Tuple;

import java.util.List;

@SuppressWarnings("unused")
public class CustomComponentRepositoryCustomImpl extends AbstractQueryBuilderRepository<CustomComponent> implements CustomComponentRepositoryCustom {

    public CustomComponentRepositoryCustomImpl() {
        super(CustomComponent.class);
    }

    @Override
    public List<Tuple> getCustomQuery(List<String> columns) {
        return super.getCustomQuery(columns);
    }
}
