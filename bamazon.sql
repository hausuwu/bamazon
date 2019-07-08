/* Schema for SQL database/table. We haven't discussed this type of file yet */
DROP DATABASE IF EXISTS bamazon;

/* Create database */
CREATE DATABASE bamazon;
USE bamazon;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE products (
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DOOM", "Video-games", 49.99, 100),
        ("Quake", "Video-games", 9.99, 100),
        ("StarCraft", "Video-games", 19.99, 100),
        ("Dune", "books", 9.99, 100),
        ("Neuromancer", "books", 29.99, 100),
        ("Logan's Run", "books", 29.99, 100),
        ("Bladerunner", "Movies", 14.99, 100),
        ("The Thing", "Movies", 14.99, 100),
        ("Alien", "Movies", 14.99, 100),
        ("Plantasia LP", "Music", 24.99, 100);
        ("Drab Majesty LP", "Music", 24.99, 100);
        ("Lust for Youth LP", "Music", 24.99, 100);

SELECT * FROM products;