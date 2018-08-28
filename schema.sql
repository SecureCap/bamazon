DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT default 0,
    stock_quanity INT default 0,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Air pods" "Electronics", 140, 5),
        ("Recliner" "Furniture", 100, 2),
        ("Kong Ball" "Pet Supplies", 140, 5),
        ("Supreme T-shirt" "Clothing", 75, 10),
        ("Mouse" "Electronics", 60, 3),
        ("Bape Hoodie" "Clothing", 200, 4),
        ("Desk" "Furniture", 45, 2),
        ("Rachel Ray" "Pet Supplies", 20, 12),
        ("Sony Headphones" "Electronics", 89, 1),
        ("Balmain joggers" "Clothing", 300, 4);