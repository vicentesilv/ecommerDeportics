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



}
