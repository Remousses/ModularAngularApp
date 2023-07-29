package com.remousses.app.modular.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public abstract class AbstractQueryBuilderResource<D, S> {

    Class<D> clazzDto;
    @Autowired
    S service;

    protected AbstractQueryBuilderResource(Class<D> clazzDto) {
        this.clazzDto = clazzDto;
    }

    protected S getService()  {
        return service;
    }

    @SuppressWarnings({"unused", "unchecked"})
    @PostMapping("getCustomQuery")
    public <U> List<U> getCustomQuery() throws Exception {
        try {
            return (List<U>) service.getClass().getMethod("getCustomQuery", clazzDto.getClass(), List.class).invoke(service, clazzDto, new ArrayList<>(Arrays.asList("title", "url", "customComponents")));
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            throw new Exception(e);
        }
    }
}
