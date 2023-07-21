USE Modular_App;

CREATE TABLE page (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100),
    PRIMARY KEY (id)
);

INSERT INTO page (title)
VALUES
    ("First page");

CREATE TABLE custom_component (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    type VARCHAR(100),
    drop_point JSON,
    page_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (page_id) REFERENCES page(id)
);
INSERT INTO custom_component (name, drop_point, type, page_id)
VALUES
    ("checkbox", '{"x": 20, "y": 30}', "Checkbox", 1);

CREATE TABLE attribute (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    value VARCHAR(100),
    type VARCHAR(100),
    custom_component_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (custom_component_id) REFERENCES custom_component(id)
);
INSERT INTO attribute (name, value, type, custom_component_id)
VALUES 
	("checked", "true", "Boolean", 1),
    ("indeterminate", "false", "Boolean", 1);