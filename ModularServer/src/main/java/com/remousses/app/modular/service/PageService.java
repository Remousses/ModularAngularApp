package com.remousses.app.modular.service;

import com.remousses.app.modular.model.entity.Page;
import com.remousses.app.modular.repository.PageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

public interface PageService {

    List<Page> getPages();
}