import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { ProductosService } from '../../services/productos.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-productos',
  imports: [MenuComponent,FormsModule, CommonModule,HttpClientModule,ReactiveFormsModule],
  providers: [ProductosService,ReactiveFormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit{
  rol = localStorage.getItem('rol');
  id = localStorage.getItem('id');
  token = localStorage.getItem('token');
  url = "http://localhost:3000/api/productos/mostrarImagen/";
  productos: any[] = [];
  nombreProducto: string = '';
  

  constructor(
    private fb: FormBuilder,
    private servicio : ProductosService
  ) {}

  ngOnInit() {
    this.productoslist();
  }
  
  productoslist() {
    if (this.rol == "vendedor") {
      if (!this.id) {
        alert("Error al cargar los productos");
      }
      console.log(this.id);
      
      this.servicio.mostrarProductosVendedor(this.token || '',this.id || '').subscribe(
        (data: any) => {
          this.productos = data;
          console.log(this.productos);
        }
      )
    }else{
    this.servicio.mostrarProductos().subscribe(
      (data: any) => {
        this.productos = data;
        console.log(this.productos);
      }
    );
  }
  }
  eliminarProducto(id: string) {
  this.servicio.eliminarProducto(id, this.token || '').subscribe(
    (data: any) => {
      this.productoslist();
    }
  );
  }
  buscarProducto() {
    if(this.nombreProducto == '') {
      this.productoslist();
    }else{
      this.servicio.buscarProductos(this.nombreProducto).subscribe(
        (data: any) => {
          this.productos = data;
          console.log(this.productos);
        }
      );
    }

  }

  agregarAlCarrito(id: string) {

  }

}
