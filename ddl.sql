CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    coord_x DOUBLE PRECISION NOT NULL,
    coord_y DOUBLE PRECISION NOT NULL
);
