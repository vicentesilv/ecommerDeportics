import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  registro(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro${token}`,{});
  }

  inicioSesion(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/inicioSesion`, credenciales);
  }

  verificarRolRuta(token: string): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/rolRutas`, { headers });
  }
  
  recuperarContrasena(correo: string): Observable<any> { 
    return this.http.post(`${this.apiUrl}/recuperarContrasena`, { correo });
  }

  resetearContrasena(token: string, nuevaContrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resetearContrasena${token}`, { nuevaContrasena });
  }
}
