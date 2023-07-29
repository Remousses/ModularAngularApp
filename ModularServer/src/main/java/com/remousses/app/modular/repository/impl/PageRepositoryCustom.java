package com.remousses.app.modular.repository.impl;

import jakarta.persistence.Tuple;

import java.util.ArrayList;
import java.util.List;

public interface PageRepositoryCustom {
    @SuppressWarnings("unused")
    List<Tuple> getCustomQuery(ArrayList<String> columns);
}
