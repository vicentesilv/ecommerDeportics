import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';
import { MenuComponent } from '../../components/menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-pedidos',
  imports: [HttpClientModule, MenuComponent,CommonModule],
  providers: [PedidosService, ProductosService],
  templateUrl: './detalle-pedidos.component.html',
  styleUrl: './detalle-pedidos.component.css'
})
export class DetallePedidosComponent implements OnInit {
  i = 0
  total = 0
  pedido: any
  detallePedido: any[] = []
  detallesProductos: any[] = []
  url = "http://localhost:3000/api/productos/mostrarImagen/"
  
  constructor(
    private route : ActivatedRoute,
    private pedidoService : PedidosService,
    private productosService : ProductosService 
  ) {}

  ngOnInit(): void {
    this.pedidoData();
  }


  pedidoData(){
    const idPedido = this.route.snapshot.queryParams['id'];
    this.pedidoService.detalleOrden(idPedido, localStorage.getItem('token') || '').subscribe(
      (response: any) => {
        this.pedido = response;
        console.log(this.pedido);
      }
    )


    this.pedidoService.detallesOrden(idPedido, localStorage.getItem('token') || '').subscribe(
      (response: any) => {
        this.detallePedido = response;
        console.log(this.detallePedido);
        this.i = this.detallePedido.length
        for (let i = 0; i < this.detallePedido.length; i++) {
          this.productosService.infoProducto(this.detallePedido[i].id_producto).subscribe(
            (response: any) => {
              this.detallesProductos.push(response);
              console.log(this.detallesProductos);
              this.total += response[0].costoVenta * this.detallePedido[i].cantidad

          
              
              
            },
            (error: any) => {
              console.error('Error al obtener los datos del producto:', error);
              alert(error.error.message);
            }
          );
        }        
      },
      (error: any) => {
        console.error('Error al obtener los datos del pedido:', error);
        alert(error.error.message);
      }
    );

  }
}
