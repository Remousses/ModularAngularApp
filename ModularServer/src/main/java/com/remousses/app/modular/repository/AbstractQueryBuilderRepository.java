package com.remousses.app.modular.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Tuple;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Root;

import java.util.List;

public abstract class AbstractQueryBuilderRepository<E> {

    Class<E> clazzEntity;

    protected AbstractQueryBuilderRepository(Class<E> clazzEntity) {
        this.clazzEntity = clazzEntity;
    }

    @PersistenceContext
    EntityManager em;

    protected List<Tuple> getCustomQuery(List<String> columns) {
        var cb = em.getCriteriaBuilder();
        var tupleQuery = cb.createTupleQuery();
        var root = tupleQuery.from(clazzEntity);

        // root.get("fieldName") allows to build selected field
        var select = columns.stream().map(root::get).toArray(Path[]::new);

        tupleQuery.multiselect(select);
        return em.createQuery(tupleQuery).getResultList();
    }
}
