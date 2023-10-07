USE Modular_App;

CREATE TABLE page (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    url VARCHAR (200) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO page (title, url)
VALUES
    ("First page", "first_page"),
    ("Second page", "second_page");

CREATE TABLE custom_component (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    drop_point JSON,
    page_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (page_id) REFERENCES page(id)
);
INSERT INTO custom_component (name, drop_point, type, page_id)
VALUES
    ("home table", '{"x": 20, "y": 30}', "Table", 1),
    ("home table", '{"x": 100, "y": 30}', "Checkbox", 1),
    ("checkbox", '{"x": 20, "y": 30}', "Checkbox", 2);

CREATE TABLE attribute (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    value TEXT,
    custom_component_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (custom_component_id) REFERENCES custom_component(id)
);
INSERT INTO attribute (name, type, value, custom_component_id)
VALUES
    ("displayedColumnsUrl", "String","http://localhost:8082/api/v1/api-mock/table/columns", 1),
    ("datasUrl", "String", "http://localhost:8082/api/v1/api-mock/table/datas", 1),
	("checked", "Boolean", "true", 2),
    ("indeterminate", "Boolean", "false", 2);
