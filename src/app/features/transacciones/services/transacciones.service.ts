import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

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
    return this.http
      .post<TransaccionResponse>(`${this.apiUrl}/create`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  getHistorial(body: any): Observable<TransaccionResponse> {
    return this.http
      .post<TransaccionResponse>(`${this.apiUrl}/historial`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let mensaje = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      mensaje = `Error cliente: ${error.error.message}`;
    } else {
      mensaje = `Error servidor: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(mensaje));
  }
}