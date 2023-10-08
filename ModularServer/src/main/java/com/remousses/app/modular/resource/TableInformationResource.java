package com.remousses.app.modular.resource;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/table-informations/")
public class TableInformationResource {
    private static final String PACKAGE_NAME = "com.remousses.app.modular.model.entity";

    @GetMapping
    public Map<String, List<String>> getAll() {
        try (
                var stream = ClassLoader.getSystemClassLoader().getResourceAsStream(PACKAGE_NAME.replaceAll("[.]", "/"));
                var reader = new BufferedReader(new InputStreamReader(stream))
        ) {
            final var fieldsByClazz = new HashMap<String, List<String>>();
            reader.lines()
                    .map(this::getClass)
                    .forEach(clazz -> fieldsByClazz.put(clazz.getSimpleName(),
                                            Arrays.stream(clazz.getDeclaredFields())
                                                .filter(field -> field.getAnnotation(JsonIgnore.class) == null)
                                                .map(field -> field.getName() + "#" + field.getType().getSimpleName()).toList()
                                    )
                    );

            return fieldsByClazz;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private Class<?> getClass(String className) {
        try {
            return Class.forName(PACKAGE_NAME + "."
                    + className.substring(0, className.lastIndexOf('.')));
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
