import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
    private apiUrl = 'http://localhost:3000/api/usuarios';

    constructor(private http: HttpClient) { }

    mostrarUsuarios() {
        return this.http.get(`${this.apiUrl}/mostrarUsuarios`);
    }

}
