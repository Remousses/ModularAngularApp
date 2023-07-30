package com.remousses.app.modular.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Tuple;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Root;

import java.util.List;

public abstract class AbstractQueryBuilderRepository {

    @PersistenceContext
    EntityManager em;

    protected <T> List<Tuple> getCustomQuery(Class<T> clazz, List<String> columns) {
        var cb = em.getCriteriaBuilder();
        var tupleQuery = cb.createTupleQuery();
        Root<T> root = tupleQuery.from(clazz);

        // root.get("fieldName") allows to build selected field
        var select = columns.stream().map(root::get).toArray(Path[]::new);

        tupleQuery.multiselect(select);
        return em.createQuery(tupleQuery).getResultList();
    }
}
