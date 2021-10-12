CREATE DATABASE react_commerce;

USE react_commerce;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) UNIQUE NOT NULL ,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    tlf INT(11) NOT NULL,
    email VARCHAR(100) NOT NULL,
    direction VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);


ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE TABLE users;

--  Tabla productos

CREATE TABLE products(
    id INT(11) NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    price INT(11) NOT NULL,
    category VARCHAR(15) NOT NULL,
    img1 VARCHAR(30) NOT NULL,
    img2 VARCHAR(30) NOT NULL,
    stock INT(10) NOT NULL,
    descr VARCHAR(100) NOT NULL
);

-- Tabla compras

CREATE TABLE compras(
    id INT(11) NOT NULL PRIMARY KEY,
    user_id INT(11) NOT NULL,
    product_id INT(11) NOT NULL,
    direction VARCHAR(100) NOT NULL,
    ordered_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Añadir producto

INSERT INTO products ( id, title, price, category, img1, img2, stock, descr)
VALUES (
    100,
    "Nike LD Waffle Sacai Black Nylon",
    401,
    "nike",
    "https://stockx-360.imgix.net/Nike-LD-Waffle-Sacai-Black-Nylon/Images/Nike-LD-Waffle-Sacai-Black-Nylon/Lv2/img",
    ".jpg?auto=format,compress&q=90&updated_at=1606321430&w=1000",
    32,
    "zapatillas nike de ultima gama"
);

INSERT INTO compras (user_id, product_id, direction)
VALUES(
    2,
    100,
    "c/altea 66 P5 BºA, extremadura, españa"
);