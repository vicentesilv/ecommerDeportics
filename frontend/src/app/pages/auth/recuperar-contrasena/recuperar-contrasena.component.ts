import { HttpClientModule } from '@angular/common/http';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recuperar-contrasena',
  imports: [FormsModule,HttpClientModule],
  providers: [AutenticacionService],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class RecuperarContrasenaComponent {
  correo = '';

  constructor(private authService: AutenticacionService) { }

  recuperarContrasena() {
    this.authService.recuperarContrasena(this.correo).subscribe(
      (response) => {
        alert('Correo enviado');
        setTimeout(() => {
          window.location.href = "https://mail.google.com/";
      },
      1000);
      },
      (error) => {
        alert('Error al enviar el correo...\n '+ error.error.message)
      }
    );
  }


}
