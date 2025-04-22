import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';
import { PedidosService } from '../../../services/pedidos.service';
import { CommonModule } from '@angular/common';
import { FormPagoComponent } from "../../../components/form-pago/form-pago.component";

@Component({
  selector: 'app-pedidos',
  imports: [MenuComponent, HttpClientModule, CommonModule, FormPagoComponent],
  providers: [PedidosService],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  id = 0;
  total = 0;
  pedidos: any[] = [];
  constructor(private PedidosService: PedidosService) { }

  ngOnInit(): void {
    this.mostrarPedidos();
  }

  mostrarPedidos(){
    this.PedidosService.mostrarPedidos(localStorage.getItem('token') || '').subscribe(
      (response:any) => {
        this.pedidos = response
        console.log('Pedidos:', response);
      },
      (error:any) => {
        console.error('Error al mostrar los pedidos:', error);
      }
    );
  }

  calcelarPedido(idOrden: string){
    this.PedidosService.cancelarPedido(idOrden, localStorage.getItem('token') || '').subscribe(
      (response:any) => {
        console.log('Pedido cancelado:', response);
        this.mostrarPedidos();
      },
      (error:any) => {
        console.error('Error al cancelar el pedido:', error);
      }
    );
  }

  abrirModal(id: number,total: number){
    this.id = id;
    this.total = total;
    
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

}
