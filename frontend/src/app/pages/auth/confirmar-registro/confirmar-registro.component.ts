import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-confirmar-registro',
  imports: [HttpClientModule],
  templateUrl: './confirmar-registro.component.html',
  styleUrl: './confirmar-registro.component.css',
  providers: [AutenticacionService]
})
export class ConfirmarRegistroComponent  {

  constructor(
    private route: ActivatedRoute,
    private authService: AutenticacionService
  ) { }

  confirmarRegistro(){
    const token = this.route.snapshot.queryParams['token'];
    this.authService.registro(token).subscribe(
      (response) => {
        alert('Usuario registrado');
        window.location.href = '/inicioSesion';
      },
      (error) => {
        alert('Error al registrar el usuario...\n'+ error.error.message);
      }
    );




  }
  
  
}
