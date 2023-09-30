package com.remousses.api.mock.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Table {
    private Integer position;
    private String name;
    private Double weight;
    private String symbol;
}
