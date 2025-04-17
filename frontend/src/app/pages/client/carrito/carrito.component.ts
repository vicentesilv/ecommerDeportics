import { Component } from '@angular/core';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito: any[] = [];
  total: number = 0;
  constructor(
    private carritoService: CarritoService,
  ) {
    
  }

}
