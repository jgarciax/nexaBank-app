import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface CuentaResponse {
  codigo_respuesta: number;
  descripcion_respuesta: string;
  data: any[];
}

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  private apiUrl = 'https://nexabank-api-dtr6.onrender.com';

  constructor(private http: HttpClient) {}

  getCuentas(): Observable<any[]> {
    return this.http
      .get<CuentaResponse>(`${this.apiUrl}/cuenta`)
      .pipe(
        map(res => this.validateResponse(res)),
        catchError(this.handleError)
      );
  }
    getCuentaByNumero(numero: string): Observable<any[]> {
      return this.http
      .get<CuentaResponse>(`${this.apiUrl}/cuenta/${numero}`)
      .pipe(
        map(res => this.validateResponse(res)),
        catchError(this.handleError)
      );
  }

  getSaldoCuentas(): Observable<any[]> {
    return this.http
      .get<CuentaResponse>(`${this.apiUrl}/cuenta/saldo`)
      .pipe(
        map(res => this.validateResponse(res)),
        catchError(this.handleError)
      );
  }

  getCodigosOperacion(): Observable<any[]> {
    return this.http
      .get<CuentaResponse>(`${this.apiUrl}/cuenta/codigos-operacion`)
      .pipe(
        map(res => this.validateResponse(res)),
        catchError(this.handleError)
      );
  }

private validateResponse(res: CuentaResponse): any[] {
  if (!res) {
    throw new HttpErrorResponse({ status: 500, statusText: 'Respuesta vacía del servidor' });
  }
  if (res.codigo_respuesta !== 0) {
    throw new HttpErrorResponse({
      status: res.codigo_respuesta,
      statusText: res.descripcion_respuesta || 'Error en respuesta'
    });
  }
  return res.data || [];
}

private handleError(error: HttpErrorResponse | Error) {
  let mensaje = 'Error desconocido';

  if (error instanceof HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      mensaje = `Error cliente: ${error.error.message}`;
    } else {
      mensaje = `Error servidor: ${error.status} - ${error.statusText}`;
    }
  } else {
    mensaje = error.message;
  }

  return throwError(() => new Error(mensaje));
}
}