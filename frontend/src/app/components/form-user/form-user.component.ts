import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-form-user',
  imports: [FormsModule, HttpClientModule],
  providers: [UsuariosService],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {
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
  constructor(private servicio: UsuariosService) { }

  funcion(){
    this.UsuarioData.domicilio = this.dom.calle + ' ' + this.dom.numero + ' ' + this.dom.colonia + ' ' + this.dom.cp;
    this.servicio.crearUsuario(this.UsuarioData, localStorage.getItem('token')!).subscribe(
      (response) => {
        alert('Usuario creado exitosamente');
        setTimeout(() => {
          window.location.href = "/admin/panel";
        }, 200);  
      },
      (error) => {
        console.log(this.UsuarioData);
        alert('Error al crear el usuario...\n error: ' + error.error.message);
      }
    )
  }
}
