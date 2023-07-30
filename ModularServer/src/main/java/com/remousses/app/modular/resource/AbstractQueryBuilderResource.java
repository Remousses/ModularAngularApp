package com.remousses.app.modular.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
    public <U> List<U> getCustomQuery(@RequestParam("columns") String columns) throws Exception {
        try {
            return (List<U>) service.getClass().getMethod("getCustomQuery", clazzDto.getClass(), List.class)
                    .invoke(service, clazzDto, Stream.of(columns.split(",")).map(String::trim).collect(Collectors.toList()));
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            throw new Exception(e);
        }
    }
}
