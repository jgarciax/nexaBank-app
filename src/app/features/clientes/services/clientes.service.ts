import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id?: number;
  nombreCompleto: string;
  dpi: string;
  fechaNacimiento: string;
  sexo: string;
  paisNacimiento: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = 'https://nexabank-api-dtr6.onrender.com/cuenta';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }
}