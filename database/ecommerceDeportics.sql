-- Crear la base de datos
CREATE DATABASE ecommerceDeportics;
USE ecommerceDeportics;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    edad INT NOT NULL CHECK (edad > 0),
    correo VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'empleado', 'cliente') NOT NULL,
    reset_token VARCHAR(255),
    reset_token_expiry DATETIME,
    domicilio VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    fechaCreado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    costoVenta DECIMAL(10, 2) NOT NULL,
    costoProduccion DECIMAL(10, 2) NOT NULL,
    status ENUM('activo', 'inactivo') NOT NULL,
    fechaCreado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaEditado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    creado_por INT NOT NULL,
    FOREIGN KEY (creado_por) REFERENCES usuarios(id) ON DELETE RESTRICT,
    FOREIGN KEY (editado_por) REFERENCES usuarios(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla de carrito
CREATE TABLE carrito (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT NOT NULL,
    id_usuario INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Vista de productos para clientes
CREATE VIEW productos_cliente AS
SELECT id, nombre, descripcion, stock, imagen, costoVenta
FROM productos
WHERE status = 'activo';

-- Vista de productos para empleados
CREATE VIEW productos_empleado AS
SELECT *
FROM productos;

-- Tabla de pagos
CREATE TABLE pago (
    id INT PRIMARY KEY AUTO_INCREMENT,
    metodo ENUM('paypal', 'tarjeta') NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    estado ENUM('pendiente', 'aprobado', 'rechazado') NOT NULL,
    fechaPago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    numero_tarjeta VARCHAR(20),
    fecha_vencimiento VARCHAR(5),
    paypal_correo VARCHAR(50)
);

-- Tabla de órdenes
CREATE TABLE orden (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estatus ENUM('pendiente', 'aprobado', 'rechazado') NOT NULL,
    fechaOrden TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_pago) REFERENCES pago(id)
);

-- Tabla intermedia para relacionar órdenes y productos
create table detalles_orden (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_oreden INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_oreden) REFERENCES orden(id),
    FOREIGN KEY (id_producto) REFERENCES productos(id)
)