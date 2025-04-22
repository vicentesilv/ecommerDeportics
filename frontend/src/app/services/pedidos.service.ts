import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  url = 'http://localhost:3000/api/orden';
  constructor(private http: HttpClient) { }
  
  crearPedido(idUsuario: string,token: string): any {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}/crearOrden`, { idUsuario }, { headers });
  }

  mostrarPedidos(token: string): any {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.url}/mostrarOrdenes`, { headers });
  }

  detallesOrden(id: string,token: string): any {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.url}/detallesOrden/${id}`, { headers });
  }

  detalleOrden(id: string,token: string): any {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.url}/detalleOrden/${id}`, { headers });
  }

  cancelarPedido(id: string,token: string): any {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/cancelarPedido/${id}`, { headers });
  }

}
