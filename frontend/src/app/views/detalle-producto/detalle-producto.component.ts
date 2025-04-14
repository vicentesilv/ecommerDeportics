import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalle-producto',
  imports: [MenuComponent, HttpClientModule],
  providers: [ProductosService],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit {
  //definicion de variables
  producto: any[] = [];
  url = "http://localhost:3000/api/productos/mostrarImagen/";
 

  // constructor
  constructor(
    private servicio: ProductosService,
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


}
