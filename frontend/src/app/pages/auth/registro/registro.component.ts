import { Usuario } from '../../../interfaces/usuario';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutenticacionService } from '../../../services/autenticacion.service';

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
    rol: '',
    fecha_nacimiento: new Date()
  };
  constructor(private authService: AutenticacionService) { }
  funcion(){
    this.UsuarioData.domicilio = this.dom.calle + ' ' + this.dom.numero + ' ' + this.dom.colonia + ' ' + this.dom.cp;
    this.authService.preRegistro(this.UsuarioData).subscribe(
      (response) => {
        alert('Pre-registro exitoso...\n se te a enviado un correo de confirmacion');
        setTimeout(() => {
          window.location.href = "https://mail.google.com/";
        }, 1000);  
      },
      (error) => {
        alert('Error al pre-registrar...\n error: ' + error);
      }
    )
  }
}
