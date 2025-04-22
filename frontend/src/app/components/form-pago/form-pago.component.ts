import { HttpClientModule } from '@angular/common/http';
import { PagosService } from './../../services/pagos.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-pago',
  imports: [HttpClientModule, FormsModule],
  providers: [PagosService],
  templateUrl: './form-pago.component.html',
  styleUrl: './form-pago.component.css'
})
export class FormPagoComponent implements OnInit {
  @Input() idOrden: number = 0; // Recibe el ID del pedido
  @Input() monto: number = 0;  // Recibe el total del pedido

  pago = {
    idOrden: 0,
    numero_tarjeta: "",
    paypal_correo: '',
    fecha_vencimiento: ''
  };

  constructor(
    private pagosService: PagosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Inicializa los valores del formulario con los datos recibidos
    this.pago.idOrden = this.idOrden;
    console.log('ID Orden:', this.idOrden);
    console.log('Total:', this.monto);
  }

  funcion(){
    this.pago.idOrden = this.idOrden;
    this.pagosService.crearPago(this.pago, localStorage.getItem('token') || '').subscribe(
      (response: any) => {
        console.log('Pago procesado:', response);
        alert('Pago procesado con éxito');
        window.location.href = '/pedidos';
      },
      (error: any) => {
        console.error('Error al crear el pago:', error);
        alert(error.error.message);
      }
    );
  }
}
