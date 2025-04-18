import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../services/carrito.service';
import { MenuComponent } from '../../../components/menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [MenuComponent,HttpClientModule,CommonModule],
  providers: [CarritoService],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  url: string = 'http://localhost:3000/api/productos/mostrarImagen';
  carrito: any[] = [];
  total: number = 0;
  constructor(
    private carritoService: CarritoService,
  ) {}

  
  ngOnInit(): void {
    this.mostrarCarrito();
  }


  mostrarCarrito() {
    const idusuario = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    if (idusuario && token) {
      this.carritoService.mostrarCarrito(idusuario, token).subscribe(
        (response) => {
          this.carrito = response;
          console.log('Carrito:', this.carrito);
          
        },
        (error) => {
          console.error('Error al mostrar el carrito:', error);
        }
      );
    } else {
      console.error('ID de usuario o token no disponibles.');
    }
  }

}
