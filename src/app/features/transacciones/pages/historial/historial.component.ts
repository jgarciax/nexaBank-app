import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransaccionesService } from '../../services/transacciones.service';

@Component({
  selector: 'app-historial',
  standalone: false,
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {

  form: FormGroup;
  transacciones: any[] = [];
  loading = false;
  hasSearched = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private transaccionesService: TransaccionesService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      clienteId: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

    private formatDate(date: Date, end: boolean = false): string {
      const d = new Date(date);
      if (end) {
        d.setHours(23, 59, 59, 0);
      } else {
        d.setHours(0, 0, 0, 0);
      }
      return d.toISOString().slice(0, 19);
    }

      buscar(): void {
        if (this.form.invalid) return;

        this.loading = true;
        this.hasSearched = true;
        this.errorMsg = '';
        this.transacciones = [];

        const { clienteId, fechaInicio, fechaFin } = this.form.value;

        if (new Date(fechaInicio) > new Date(fechaFin)) {
          this.errorMsg = 'La fecha inicio no puede ser mayor que la fecha fin';
          this.loading = false;
          return;
        }

        const payload = {
          clienteId: Number(clienteId),
          fechaInicio: this.formatDate(fechaInicio, false),
          fechaFin: this.formatDate(fechaFin, true)
        };

        this.transaccionesService.getHistorial(payload).subscribe({
          next: (resp: any) => {
            if (resp.codigo_respuesta === 0) {
              this.transacciones = resp.data || [];

              if (this.transacciones.length === 0) {
                this.errorMsg = 'No se encontraron transacciones';
              }
            } else {
              this.errorMsg = resp.descripcion_respuesta || 'Error en la consulta';
            }

            this.loading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.errorMsg = err?.message || 'Error al consultar el historial';
            this.loading = false;
            this.cdr.detectChanges();
          }
        });
      }
}