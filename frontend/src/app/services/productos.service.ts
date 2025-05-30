import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:3000/api/productos';
  constructor(private http: HttpClient) { }

  mostrarProductos(): any {
    return this.http.get(`${this.apiUrl}/mostrarProductos`);
  }
  buscarProductos(nombre: string): any {
    return this.http.get(`${this.apiUrl}/buscarProductos/${nombre}`);
  }
  infoProducto(id: string): any {
    return this.http.get(`${this.apiUrl}/infoProducto/${id}`);
  }
  
  

  mostrarProductosVendedor(token: string,id: string): any {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/mostrarProductosVendedor/${id}`, { headers });
  }
  
  crearProducto(producto: any,token: string): any {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // const formData = new FormData();
    // formData.append('producto', JSON.stringify(producto));
    // formData.append('imagen', producto.imagen);
    return this.http.post(`${this.apiUrl}/crearProducto`, producto, { headers });
  }
  
  eliminarProducto(id: string, token: string): any {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/eliminarProducto/${id}`, { headers });
  }
  
  editarProducto(id: string, producto: any, token: string): any {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/editarProducto/${id}`, producto, { headers });
  }
}