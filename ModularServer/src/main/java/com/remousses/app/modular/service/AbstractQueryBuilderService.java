package com.remousses.app.modular.service;

import com.remousses.app.modular.component.ModelMapperCustomize;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.remousses.app.modular.util.QueryConstant.ADD_METHOD_PREFIX;
import static com.remousses.app.modular.util.QueryConstant.GETTER_METHOD_PREFIX;
import static com.remousses.app.modular.util.QueryConstant.ID_METHOD;
import static com.remousses.app.modular.util.QueryConstant.SETTER_METHOD_PREFIX;

public abstract class AbstractQueryBuilderService<R> {

    @Autowired
    R repository;

    @Autowired
    protected ModelMapperCustomize modelMapperCustomize;

    protected R getRepository()  {
        return repository;
    }

    /**
     * Allows to create custom query.
     * If you want a list then add method "addAttributeName" with one parameter with type of your attribute like PageDto.
     * @param clazzDto
     * @param columns
     * @return list of
     * @param <U>
     * @throws Exception
     */
    public <U> List<U> getCustomQuery(final Class<U> clazzDto, final List<String> columns) throws Exception {
        columns.add(0, "id");

        @SuppressWarnings("unchecked")
        final var tupleResult = (List<Tuple>) repository.getClass().getMethod("getCustomQuery", columns.getClass()).invoke(repository, columns);

        final var finalResult = new ArrayList<U>();
        for (final Tuple tupleValue : tupleResult) {
            // Check if tuple is already in final result (to merge each same content)
            final var valueOpt = finalResult.stream().filter(res -> {
                try {
                    return invokeGetterMethod(ID_METHOD, res).equals(tupleValue.get(0));
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }).findFirst();

            final var existingValue = valueOpt.isPresent();

            U prepareDto;
            if (existingValue) {
                prepareDto = valueOpt.get();
            } else {
                try {
                    prepareDto = clazzDto.getDeclaredConstructor().newInstance();
                } catch (InstantiationException | IllegalAccessException | InvocationTargetException |
                         NoSuchMethodException e) {
                    throw new Exception(e);
                }
            }

            for (int colId = 0; colId < columns.size(); colId++) {
                final String s = columns.get(colId);

                invokeSetterMethod(getMethodNameSuffix(s), prepareDto, tupleValue.get(colId));

            }
            if (!existingValue) {
                finalResult.add(prepareDto);
            }
        }

        return finalResult;
    }

    private String getMethodNameSuffix(String s) {
        return s.substring(0, 1).toUpperCase() + s.substring(1);
    }

    private <T> Object invokeGetterMethod(String methodName, T clazzInstance) throws Exception {
        try {
            return clazzInstance.getClass().getMethod(methodName).invoke(clazzInstance);
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            throw new Exception(e);
        }
    }

    private <T, U> void invokeSetterMethod(String suffix, T prepareDto, U value) throws Exception {
        try {
            prepareDto.getClass().getMethod(SETTER_METHOD_PREFIX + suffix, value.getClass()).invoke(prepareDto, value);
        } catch (IllegalAccessException | InvocationTargetException e) {
            throw new Exception(e);
        } catch (NoSuchMethodException e) {
            if (invokeGetterMethod(GETTER_METHOD_PREFIX + suffix, prepareDto) instanceof List<?>) {
                final Object dto = modelMapperCustomize.map(value, Class.forName(value.getClass().getCanonicalName().replaceAll(".entity", ".dto") + "Dto"));
                prepareDto.getClass().getMethod(ADD_METHOD_PREFIX + suffix.substring(0, suffix.length() - 1), dto.getClass())
                        .invoke(prepareDto, dto);
            }
        }
    }
}
