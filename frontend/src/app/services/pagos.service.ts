import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  url = 'http://localhost:3000/api/pagos';

  constructor(private http: HttpClient) {}

  crearPago(pago: any, token: string) {
    {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(`${this.url}/procesarPago`, pago, { headers });
    }
  }
}
