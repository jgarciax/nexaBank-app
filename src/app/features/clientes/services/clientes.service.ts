import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Cliente {
  id: number;
  nombre_completo: string;
  dpi: string;
  fecha_nacimiento: string;
  sexo: string;
  pais_nacimiento: string;
}

export interface CuentaResponse {
  codigo_respuesta: number;
  descripcion_respuesta: string;
  data: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = 'https://nexabank-api-dtr6.onrender.com';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http
      .get<CuentaResponse>(`${this.apiUrl}/cuenta`)
      .pipe(
        map(res => this.validateResponse(res)),
        map(cuentas => this.extractClientesUnicos(cuentas)),
        catchError(this.handleError)
      );
  }

  createCliente(cliente: Partial<Cliente>): Observable<any> {
    return this.http
      .post<CuentaResponse>(`${this.apiUrl}/cuenta`, cliente)
      .pipe(
        map(res => this.validateResponse(res)),
        catchError(this.handleError)
      );
  }

  private extractClientesUnicos(cuentas: any[]): Cliente[] {
    const seen = new Set<number>();
    return cuentas
      .map(c => c.cliente)
      .filter(cliente => {
        if (seen.has(cliente.id)) return false;
        seen.add(cliente.id);
        return true;
      });
  }

  private validateResponse(res: CuentaResponse): any[] {
    if (!res || res.codigo_respuesta !== 0) {
      throw new Error(res?.descripcion_respuesta || 'Respuesta inválida del servidor');
    }
    return res.data || [];
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