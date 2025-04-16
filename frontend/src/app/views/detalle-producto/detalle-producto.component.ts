import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-detalle-producto',
  imports: [MenuComponent, HttpClientModule, CommonModule, FormsModule],
  providers: [ProductosService, CarritoService],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit {
  //definicion de variables
  producto: any[] = [];
  url = "http://localhost:3000/api/productos/mostrarImagen/";
  rol = localStorage.getItem('rol');
  cantidad = 0;
  idusuario = localStorage.getItem('id');
  token = localStorage.getItem('token');
 

  // constructor
  constructor(
    private servicio: ProductosService,
    private CarritoService: CarritoService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
   this.productoData();

  }

  productoData() {
    const idProducto = this.route.snapshot.queryParams['idProducto'];
    console.log('ID del producto:', idProducto); // Verifica si el ID se obtiene correctamente
  
    this.servicio.infoProducto(idProducto).subscribe(
      (response: any) => {
        console.log('Datos del producto:', response); // Verifica los datos recibidos
        this.producto = response;
        console.log(this.producto[0].nombre);
        
      },
      (error: any) => {
        console.error('Error al obtener los datos del producto:', error);
        alert(error.error.message);
      }
    );
  }


  agregarAlCarrito(idProducto: string, cantidad: number) {
    const data = {
      idProducto: idProducto,
      cantidad: cantidad
    }
    this.CarritoService.agregarAlCarrito(data, this.idusuario || '', this.token || '').subscribe(
      (data: any) => {
        console.log(data);
        alert("Producto agregado al carrito");
      },
      (error: any) => {
        console.error(error);
        alert(error.error.message);
      }
    
    );  
    window.location.reload();
    
  }

}
