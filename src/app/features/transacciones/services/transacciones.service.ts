import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TransaccionResponse {
  codigo_respuesta: number;
  descripcion_respuesta: string;
  data?: any[];
  id_transaccion?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  private apiUrl = 'https://nexabank-api-dtr6.onrender.com/transacciones';

  constructor(private http: HttpClient) {}

  createTransaction(body: any): Observable<TransaccionResponse> {
    return this.http.post<TransaccionResponse>(`${this.apiUrl}/create`, body);
  }

  getHistorial(body: any): Observable<TransaccionResponse> {
    return this.http.post<TransaccionResponse>(`${this.apiUrl}/historial`, body);
  }
}
