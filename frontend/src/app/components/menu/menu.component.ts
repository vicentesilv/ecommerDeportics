import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  providers: [Router],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  rol = localStorage.getItem('rol');

  constructor(private router: Router) {
    this.rol = localStorage.getItem('rol');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('correo');
    localStorage.removeItem('telefono');
    localStorage.removeItem('domicilio');
    localStorage.removeItem('edad');
    window.location.href = "/";
  }

} 