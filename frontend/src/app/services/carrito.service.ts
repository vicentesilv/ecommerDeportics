import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Carrito {
    private apiUrl = 'http://localhost:3000/api/carrito';
    constructor(private http: HttpClient) { }



    
}