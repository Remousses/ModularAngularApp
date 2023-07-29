package com.remousses.app.modular.repository.impl;

import com.remousses.app.modular.model.entity.Page;
import com.remousses.app.modular.repository.AbstractQueryBuilderRepository;
import jakarta.persistence.Tuple;

import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unused")
public class PageRepositoryCustomImpl extends AbstractQueryBuilderRepository implements PageRepositoryCustom {
    public List<Tuple> getCustomQuery(ArrayList<String> columns) {
        return getCustomQuery(Page.class, columns);
    }
}
