import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
    private apiUrl = 'http://localhost:3000/api/usuarios';

    constructor(private http: HttpClient) { }

    mostrarUsuarios(token: string) {
        let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.apiUrl}/mostrarUsuarios`, { headers });
    }
    buscarUsuario(nombre: string, token: string) {
        let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.apiUrl}/buscarUsuarios/${nombre}`);
    }
    eliminarUsuario(id: string, token: string) {
        let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete(`${this.apiUrl}/eliminarUsuario/${id}`, { headers });
    }

}
