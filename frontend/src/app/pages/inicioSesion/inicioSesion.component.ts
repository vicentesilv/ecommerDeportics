import { AutenticacionService } from '../../services/autenticacion.service';
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
  
  constructor(public authService: AutenticacionService) { }


  oninicioSesion() {
    console.log('Credenciales', this.credenciales);
    
    this.authService.inicioSesion(this.credenciales).subscribe(
      (response) => {
        console.log('Credenciales', this.credenciales);
        console.log('Inicio de sesión exitoso', response);
      },
      (error) => {
        console.log('Credenciales', this.credenciales);
        console.error('Error al iniciar sesión', error);
      }
    );
  }


}
