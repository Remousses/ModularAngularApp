package com.remousses.app.modular.repository;

import com.remousses.app.modular.model.entity.Attribute;
import com.remousses.app.modular.repository.impl.AttributeRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttributeRepository extends JpaRepository<Attribute, Integer>, AttributeRepositoryCustom {
}
