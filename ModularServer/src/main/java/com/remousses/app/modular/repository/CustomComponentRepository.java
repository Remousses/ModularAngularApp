package com.remousses.app.modular.repository;

import com.remousses.app.modular.model.entity.CustomComponent;
import com.remousses.app.modular.repository.impl.CustomComponentRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomComponentRepository extends JpaRepository<CustomComponent, Integer>, CustomComponentRepositoryCustom {
}
