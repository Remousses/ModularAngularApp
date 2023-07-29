package com.remousses.app.modular.repository;

import com.remousses.app.modular.model.entity.Page;
import com.remousses.app.modular.repository.impl.PageRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PageRepository extends JpaRepository<Page, Integer>, PageRepositoryCustom {
    Page findByTitle(String title);

    void deleteByTitle(String title);
}
