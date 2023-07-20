USE Modular_App;

CREATE TABLE attribute_type (
    id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR(20),
    PRIMARY KEY (id)
);
INSERT INTO attribute_type (type)
VALUES
	("Boolean"),
	("Number"),
	("Float");

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
    drop_point JSON,
    page_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (page_id) REFERENCES page(id)
);
INSERT INTO custom_component (name, drop_point, page_id)
VALUES
    ("checkbox", '{"x": 20, "y": 30}', 1);

CREATE TABLE attribute (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    value VARCHAR(50),
    attribute_type_id INT NOT NULL,
    custom_component_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (attribute_type_id) REFERENCES attribute_type(id),
    FOREIGN KEY (custom_component_id) REFERENCES custom_component(id)
);
INSERT INTO attribute (name, value, attribute_type_id, custom_component_id)
VALUES 
	("checked", "true", 1, 1),
    ("indeterminate", "false", 1, 1);