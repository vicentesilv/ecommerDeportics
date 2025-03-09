import { Usuario } from './../../interfaces/usuario';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'RegistroComponent',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  providers: [AutenticacionService]
})

export class RegistroComponent {
  dom = {
    colonia:'',
    calle:'',
    numero:'',
    cp:'',
  }
  UsuarioData: Usuario = {
    nombre: '',
    apellido: '',
    edad: 0,
    correo: '',
    contrasena: '',
    domicilio: '',
    telefono: '',
    fecha_nacimiento: new Date()
  };
  constructor(private authService: AutenticacionService) { }
  funcion(){
    this.UsuarioData.domicilio = this.dom.calle + ' ' + this.dom.numero + ' ' + this.dom.colonia + ' ' + this.dom.cp;
    this.authService.preRegistro(this.UsuarioData).subscribe(
      (response) => {
        console.log('Pre-registro exitoso', response);
      },
      (error) => {
        console.error('Error al pre-registrar', error);
      }
    )
  }
}
