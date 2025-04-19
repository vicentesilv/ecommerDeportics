import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../services/carrito.service';
import { MenuComponent } from '../../../components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  imports: [MenuComponent,HttpClientModule,CommonModule,FormsModule],
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

          for (const producto of this.carrito) {
            this.total += producto.costoVenta * producto.cantidadProducto;
          }
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


  eliminarProducto(id: any,idProducto: any,cantidad: number) {
    const params = {
      idProducto: idProducto,
      cantidad: cantidad
    }
    console.log('ID del producto a eliminar:', id);
    console.log('ID del producto:', idProducto);
    console.log('Cantidad del producto:', cantidad);
    
    this.carritoService.eliminarCarrito(id,params,localStorage.getItem('token')!).subscribe(
      (response) => {
        console.log('Producto eliminado del carrito:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error al eliminar el producto del carrito:', error);
      }
    );

  }
}