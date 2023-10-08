package com.remousses.app.modular.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.lang.reflect.InvocationTargetException;
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
    @GetMapping("getCustomQuery")
    public List<D> getCustomQuery(@RequestBody List<String> columns) throws Exception {
        try {
            return (List<D>) service.getClass().getMethod("getCustomQuery", Class.class, List.class)
                    .invoke(service, clazzDto, columns);
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            throw new Exception(e);
        }
    }
}
