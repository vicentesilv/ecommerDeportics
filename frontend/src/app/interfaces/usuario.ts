export interface Usuario {
    id?: number;
    nombre: string;
    apellido: string;
    edad: number
    correo: string;
    contrasena: string;
    rol?: string;
    reset_token?: string;
    reset_token_expiry?: Date;
    domicilio: string;
    telefono: string;
    fecha_nacimiento: Date;
}
