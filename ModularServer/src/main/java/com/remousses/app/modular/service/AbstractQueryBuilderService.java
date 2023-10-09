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
     * If you want a list then add method "addAttributeName" with one parameter with the type of your attribute like {@link com.remousses.app.modular.model.dto.PageDto}.
     * @param clazzDto dedicated Dto
     * @param columns fields in dedicated entity.
     * @return list of dedicated Dto
     * @throws Exception
     */
    public <D> List<D> getCustomQuery(final Class<D> clazzDto, final List<String> columns) throws Exception {
        columns.add(0, "id");

        @SuppressWarnings("unchecked")
        final var tupleResult = (List<Tuple>) repository.getClass().getMethod("getCustomQuery", columns.getClass().getInterfaces()[0]).invoke(repository, columns);

        final var finalResult = new ArrayList<D>();
        for (final Tuple tupleValue : tupleResult) {
            buildPreparedDto(clazzDto, columns, finalResult, tupleValue);
        }

        return finalResult;
    }

    private <D> void buildPreparedDto(Class<D> clazzDto, List<String> columns, ArrayList<D> finalResult, Tuple tupleValue) throws Exception {
        final Optional<D> valueOpt = findSameTupleId(finalResult, tupleValue);
        final var existingValue = valueOpt.isPresent();
        final D preparedDto;

        if (existingValue) {
            preparedDto = valueOpt.get();
            fillPreparedDto(columns, tupleValue, preparedDto);
        } else {
            try {
                preparedDto = clazzDto.getDeclaredConstructor().newInstance();
            } catch (InstantiationException | IllegalAccessException | InvocationTargetException |
                     NoSuchMethodException e) {
                throw new Exception(e);
            }
            fillPreparedDto(columns, tupleValue, preparedDto);
            finalResult.add(preparedDto);
        }
    }

    private <D> void fillPreparedDto(List<String> columns, Tuple tupleValue, D preparedDto) throws Exception {
        for (int colId = 0; colId < columns.size(); colId++) {
            final String columnName = columns.get(colId);
            invokeSetterMethod(getMethodNameSuffix(columnName), preparedDto, tupleValue.get(colId));
        }
    }

    /**
     * Check if tuple is already in final result (to merge each same content).
     * Good to know: When the tuple returns the values of a list,
     * the content is decomposed by the number of elements in the list (ex: 4 elements in the list equals 4 Tuples).
     * @param finalResult the final Dto to return.
     * @param tupleValue current tuple.
     * @return an optional with true if the tuple was already in {@param finalResult}.
     */
    private <D> Optional<D> findSameTupleId(List<D> finalResult, Tuple tupleValue) {
        return finalResult.stream().filter(res -> {
            try {
                return invokeGetterMethod(ID_METHOD, res).equals(tupleValue.get(0));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).findFirst();
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

    private <T, U> void invokeSetterMethod(String suffix, T preparedDto, U value) throws Exception {
        try {
            preparedDto.getClass().getMethod(SETTER_METHOD_PREFIX + suffix, value.getClass()).invoke(preparedDto, value);
        } catch (IllegalAccessException | InvocationTargetException e) {
            throw new Exception(e);
        } catch (NoSuchMethodException e) {
            // Handle the case when we want a list
            if (invokeGetterMethod(GETTER_METHOD_PREFIX + suffix, preparedDto) instanceof List<?>) {
                final Object dto = modelMapperCustomize.map(value, Class.forName(value.getClass().getCanonicalName().replaceAll(".entity", ".dto") + "Dto"));
                preparedDto.getClass().getMethod(ADD_METHOD_PREFIX + suffix.substring(0, suffix.length() - 1), dto.getClass())
                        .invoke(preparedDto, dto);
            }
        }
    }
}
