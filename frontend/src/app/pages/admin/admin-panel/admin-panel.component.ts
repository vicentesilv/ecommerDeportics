import { UsuariosService } from './../../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormUserComponent } from '../../../components/form-user/form-user.component';


@Component({
  selector: 'app-admin-panel',
  imports: [MenuComponent, HttpClientModule, CommonModule, FormsModule,FormUserComponent],
  providers: [UsuariosService],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit{
  nombreUsuario: string = '';
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
    let rol = localStorage.getItem('rol');
    let token = localStorage.getItem('token');
    if (!token) {
      alert('No estas logueado');
      window.location.href = "/inicioSesion";
      return;
    } else if(rol != 'admin'){  
      alert('No tienes permisos para ver esta pagina');
      window.location.href = "/inicioSesion";
      return;
    }
    this.servicio.mostrarUsuarios(token).subscribe((data: any) => {
      this.usuarios = data;
      console.log(this.usuarios);
      
    });
  }

  buscarUsuario(){
    if (!this.nombreUsuario) {
      this.mostrarUsuarios();
    }
    this.servicio.buscarUsuario(this.nombreUsuario, localStorage.getItem('token')!).subscribe((data: any) => {
      this.usuarios = data;
      console.log(this.usuarios);
    }
    );

  }

  eliminarusuario(id: string){
    this.servicio.eliminarUsuario(id, localStorage.getItem('token')!).subscribe((data: any) => {
      this.mostrarUsuarios();
    });
  }

  abrirModal(){
    let modal = document.querySelector('.modal');
    if (!modal) {
      console.error('Modal element not found');
      return;
    }
    modal.getAttribute('style')
      ?.includes('display: none') 
       modal.setAttribute('style', 'display: flex')
    
  }

  cerrarModal(){
    let modal = document.querySelector('.modal');
    if (!modal) {
      console.error('Modal element not found');
      return;
    }
    modal.getAttribute('style')
      ?.includes('display: none') 
       modal.setAttribute('style', 'display: none')
  }
  
  // this.usuariosService.mostrarUsuarios().subscribe((data: any) => {});

  
}
