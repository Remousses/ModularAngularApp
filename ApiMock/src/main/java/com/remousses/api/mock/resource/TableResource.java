package com.remousses.api.mock.resource;

import com.remousses.api.mock.model.Table;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/table/")
public class TableResource {

    @GetMapping("columns")
    public List<String> getDColumns() {
        return List.of("position", "name", "weight", "symbol");
    }

//    [{\"position\":1,\"name\":\"Hydrogen\",\"weight\":1.0079,\"symbol\":\"H\"},{\"position\":2,\"name\":\"Helium\",\"weight\":4.0026,\"symbol\":\"He\"}]
    @GetMapping("datas")
    public List<Table> getDatas() {
        return List.of(
                new Table(1, "Hydrogen", 1.0079, "H"),
                new Table(2, "Helium", 4.0026, "He"),
                new Table(3, "Métal", 1000D, "M")
        );
    }
}
