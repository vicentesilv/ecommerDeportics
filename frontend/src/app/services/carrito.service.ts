import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
    private apiUrl = 'http://localhost:3000/api/carrito';
    constructor(private http: HttpClient) { }

    agregarAlCarrito(data: any,idusuario: string, token: string): Observable<any> {
        let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(`${this.apiUrl}/agregarAlCarrito/${idusuario}`, data, { headers });
    }

    
}