import { AutenticacionService } from '../../../services/autenticacion.service';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'inicioSesionComponent',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './inicioSesion.component.html',
  styleUrl: './inicioSesion.component.css',
  providers: [AutenticacionService]
})
export class InicioSesionComponent {
  credenciales ={correo: '',contrasena: ''};
  
  constructor(private authService: AutenticacionService) { }


  oninicioSesion() {
    console.log('Credenciales', this.credenciales);
    
    this.authService.inicioSesion(this.credenciales).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        // sessionStorage.setItem('token', response.token);
        this.authService.verificarRolRuta(response.token).subscribe(
          (response) => {
            localStorage.setItem('rol', response.rol);
            localStorage.setItem('nombre', response.nombre);
            localStorage.setItem('apellido', response.apellido);
            localStorage.setItem('correo', response.correo);
            localStorage.setItem('telefono', response.telefono);
            localStorage.setItem('domicilio', response.domicilio);
            localStorage.setItem('edad', response.edad);


            window.location.href = "/info";

        },
        (error) => {
          console.error('Error al verificar el rol de la ruta', error);
        }
        );
      }
      ,(error) => {
        alert('Error al iniciar sesion...\n ' + error.error.message);
      }
    );
  }


  
}