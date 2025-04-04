import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-info',
  imports: [MenuComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  constructor() {
    if (!localStorage.getItem('token')) {
      alert('No estas logueado');
      window.location.href = "/inicioSesion";
    }
  }

  nombre = localStorage.getItem('nombre');
  apellido = localStorage.getItem('apellido');
  correo = localStorage.getItem('correo');
  telefono = localStorage.getItem('telefono');
  domicilio = localStorage.getItem('domicilio');
  edad = localStorage.getItem('edad');
  rol = localStorage.getItem('rol');
  

}
