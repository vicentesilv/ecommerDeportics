import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';
import { PedidosService } from '../../../services/pedidos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  imports: [MenuComponent,HttpClientModule,CommonModule],
  providers: [PedidosService],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
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

  

}
