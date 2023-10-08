package com.remousses.app.modular.repository.impl;

import com.remousses.app.modular.model.entity.Page;
import com.remousses.app.modular.repository.AbstractQueryBuilderRepository;
import jakarta.persistence.Tuple;

import java.util.List;

@SuppressWarnings("unused")
public class PageRepositoryCustomImpl extends AbstractQueryBuilderRepository<Page> implements PageRepositoryCustom {

    public  PageRepositoryCustomImpl() {
        super(Page.class);
    }

    @Override
    public List<Tuple> getCustomQuery(List<String> columns) {
        return super.getCustomQuery(columns);
    }
}
