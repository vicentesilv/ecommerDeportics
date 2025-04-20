import { HttpClientModule, httpResource } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { ProductosService } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';




@Component({
  selector: 'app-productos',
  imports: [MenuComponent,FormsModule, CommonModule,HttpClientModule],
  providers: [ProductosService,CarritoService],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit{
  cantidad = 0;
  accion = ""
  rol = localStorage.getItem('rol');
  idusuario = localStorage.getItem('id');
  token = localStorage.getItem('token');
  url = "http://localhost:3000/api/productos/mostrarImagen/";
  productos: any[] = [];
  imagen = '';
  formData: any = {
    id: '',
    nombre: '',
    descripcion: '',
    stock: '',
    costoVenta: '',
    costoProduccion: '',
    status: '',
    idVendedor: ''
  };
  nombreProducto: string = '';
  

  constructor(
    private servicio : ProductosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.productoslist();
  }
  
  productoslist() {
    if (this.rol == "vendedor") {
      if (!this.idusuario) {
        alert("Error al cargar los productos");
      }
      console.log(this.idusuario);
      
      this.servicio.mostrarProductosVendedor(this.token || '',this.idusuario || '').subscribe(
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

  crearProducto() {
    this.formData.idVendedor = this.idusuario;
    console.log(this.formData);
    
    const inputElement = document.querySelector('#imagen') as HTMLInputElement;
    const file = inputElement?.files?.[0] || null;

    if (!file) {
      alert('Por favor selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('imagen', file);
    formData.append('id', this.formData.id);
    formData.append('nombre', this.formData.nombre);
    formData.append('descripcion', this.formData.descripcion);
    formData.append('stock', this.formData.stock);
    formData.append('costoVenta', this.formData.costoVenta);
    formData.append('costoProduccion', this.formData.costoProduccion);
    formData.append('status', this.formData.status);
    formData.append('creadopor', this.formData.idVendedor);
    formData.append('idVendedor', this.formData.idVendedor);

    this.servicio.crearProducto(formData, this.token || '').subscribe(
      (data: any) => {
      this.productoslist();
      }
    );
    window.location.reload();
    
  }

  editarProducto(id: string) {
    this.formData.idVendedor = this.idusuario;
    this.servicio.editarProducto(id, this.formData, this.token || '').subscribe(
      (data: any) => {
        this.productoslist();
      }
    );
    window.location.reload();

  }



  agregarAlCarrito(idProducto: string, cantidad: number) {
    const data = {
      idProducto: idProducto,                                                                                                     
      cantidad: cantidad
    }
    this.carritoService.agregarAlCarrito(data, this.idusuario || '', this.token || '                                                                                                    ').subscribe(
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

  cerrarModal() {
    this.formData = {
      id: '',
      nombre: '',
      descripcion: '',
      stock: '',
      costoVenta: '',
      costoProduccion: '',
      status: '',
      idVendedor: ''
    };
    let modal = document.querySelector('.modal');
    if (!modal) {
      console.error('Modal element not found');
      return;
    }
    modal.getAttribute('style')
      ?.includes('display: none') 
       modal.setAttribute('style', 'display: none')
  }
  abrirModal(accion: string,idProducto: string) {
    this.accion = accion;
    if (accion == "editar") {
      console.log("editar");
      
      this.servicio.infoProducto(idProducto).subscribe(
        (data: any) => {
          this.formData = data[0];
        }
      );
    }
    let modal = document.querySelector('.modal');
    if (!modal) {
      console.error('Modal element not found');
      return;
    }
    modal.getAttribute('style')
      ?.includes('display: none') 
       modal.setAttribute('style', 'display: flex')
    
  }

}
