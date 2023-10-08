package com.remousses.app.modular.repository.impl;

import com.remousses.app.modular.model.entity.Attribute;
import com.remousses.app.modular.repository.AbstractQueryBuilderRepository;
import jakarta.persistence.Tuple;

import java.util.List;

@SuppressWarnings("unused")
public class AttributeRepositoryCustomImpl extends AbstractQueryBuilderRepository<Attribute> implements AttributeRepositoryCustom {

    public AttributeRepositoryCustomImpl() {
        super(Attribute.class);
    }

    public List<Tuple> getCustomQuery(List<String> columns) {
        return getCustomQuery(columns);
    }
}
