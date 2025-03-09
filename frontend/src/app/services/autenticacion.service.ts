import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  preRegistro(usuarioData: any): Observable<any> { 
    return this.http.post(`${this.apiUrl}/preRegistro`, usuarioData);
  }

  registro(token: string, usuarioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro/${token}`, usuarioData);
  }

  inicioSesion(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/inicioSesion`, credenciales);
  }
  
  recuperarContrasena(correo: string): Observable<any> { 
    return this.http.post(`${this.apiUrl}/recuperarContrasena`, { correo });
  }

  resetearContrasena(token: string, nuevaContrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resetearContrasena/${token}`, { nuevaContrasena });
  }
}
