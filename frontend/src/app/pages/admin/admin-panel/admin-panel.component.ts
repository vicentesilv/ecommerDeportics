import { UsuariosService } from './../../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-panel',
  imports: [MenuComponent, HttpClientModule, CommonModule],
  providers: [UsuariosService],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit{
  constructor(private servicio : UsuariosService) {
    if (!localStorage.getItem('token')) {
      alert('No estas logueado');
      window.location.href = "/inicioSesion";
    }else if(localStorage.getItem('rol') != 'admin'){
      alert('No estas logueado');
      window.location.href = "/inicioSesion";
    }
  }
  ngOnInit(): void {
    this.mostrarUsuarios();
    
  }
  usuarios: any[] = [];
  mostrarUsuarios(){
    this.servicio.mostrarUsuarios().subscribe((data: any) => {
      this.usuarios = data;
      console.log(this.usuarios);
      
    });
  }

  eliminarusuario(id: string){}

  
  // this.usuariosService.mostrarUsuarios().subscribe((data: any) => {});

  
}
