import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetear-contrasena',
  imports: [FormsModule, HttpClientModule],
  providers: [AutenticacionService],
  templateUrl: './resetear-contrasena.component.html',
  styleUrl: './resetear-contrasena.component.css'
})
export class ResetearContrasenaComponent {
  contrasena = '';

  constructor(
    private route : ActivatedRoute,
    private authService : AutenticacionService
  ){}

  resetearContrasena(){
    const token = this.route.snapshot.queryParams['token'];
    this.authService.resetearContrasena(token, this.contrasena).subscribe(
      (response) => {
        alert('Contraseña reseteada');
        window.location.href = '/inicioSesion';
      },
      (error) => {
        alert('Error al resetear la contraseña...\n ' + error.error.message);
      }
    )
  }
}
