create Database ecommerceDeportics;
use ecommerceDeportics;

create table usuarios(
    id int primary key auto_increment,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    edad int not null,
    correo varchar(50) not null,
    contrasena varchar(255) not null,
    rol enum('admin', 'empleado', 'cliente') not null,
    domicilio varchar(255) not null,
    telefono varchar(20) not null,
    fechaCreado timestamp default current_timestamp,

);

create table productos(
    id int primary key auto_increment,
    nombre varchar(50) not null,
    descripcion varchar(255) not null,
    stock int not null,
    imagen varchar(255) not null,
    costoVenta decimal(10,2) not null,
    costoProduccion decimal(10,2) not null,
    status enum('activo', 'inactivo') not null,
    fechaCreado timestamp default current_timestamp
    fechaEditado timestamp default current_timestamp on update current_timestamp,
    creado_por int not null,
    editado_por int not null,
    foreign key (editado_por) references usuarios(id) on update cascade,
    foreign key (creado_por) references usuarios(id)
);

create table carrito (
    id int primary key auto_increment,
    id_producto int not null,
    id_usuario int not null,
    cantidad int not null,
    foreign key (id_producto) references productos(id),
    foreign key (id_usuario) references usuarios(id)
);

create view productos_cliente as select id,nombre,descripcion,stock,imagen,costoVenta from productos where status = 'activo';

create table productos_empleado as select * from productos;

create table pago(
    id int primary key auto_increment,
    metodo enum('paypal', 'tarjeta') not null,
    monto decimal(10,2) not null,
    estado enum('pendiente', 'aprobado', 'rechazado') not null,
    fechaPago timestamp default current_timestamp
    detallesPago text not null,
);
create orden(
    id int primary key auto_increment,
    id_usuario int not null,
    id_pagont int not null,
    foreign key (id_usuario) references usuarios(id),
    foreign key (id_pago) references pago(id),
    fechaOrden timestamp default current_timestamp
);
