import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { ProductosService } from '../../services/productos.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-productos',
  imports: [MenuComponent, CommonModule,HttpClientModule],
  providers: [ProductosService],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit{
  rol = localStorage.getItem('rol');
  token = localStorage.getItem('token');
  url = "http://localhost:3000/api/productos/mostrarImagen/";
  productos: any[] = [];

  constructor(private servicio : ProductosService) { }

  ngOnInit() {
    this.productoslist();
  }
  
  productoslist() {
    


    this.servicio.mostrarProductos().subscribe(
      (data: any) => {
        this.productos = data;
        console.log(this.productos);
      }
    );
  }

  agregarAlCarrito(producto: any) {}






}
