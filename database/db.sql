CREATE DATABASE presupuesto;

USE presupuesto;

--Tabla operaciones
CREATE TABLE operaciones(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    monto DECIMAL(50) NOT NULL,
    concepto VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL UNIQUE,
    tipo VARCHAR(50)
);

-- -- Tabla Libro
-- CREATE TABLE libro(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     nombre VARCHAR(100) NOT NULL,
--     descripcion VARCHAR(255),
--     categoria_id INT NOT NULL,
--     persona_id INT,
--     CONSTRAINT fk_persona FOREIGN KEY (persona_id) REFERENCES persona(id),
--     CONSTRAINT fk_categoria FOREIGN KEY (categoria_id) REFERENCES categoria(id)
-- );

-- -- Tabla Categoria
-- CREATE TABLE categoria(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     nombre VARCHAR(100) NOT NULL
-- );

