import { Component } from '@angular/core';
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

  constructor(
    private fb: FormBuilder,
    private transaccionesService: TransaccionesService
  ) {
    this.form = this.fb.group({
      clienteId: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  buscar(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.hasSearched = true;

    // Formatting dates with time if they only provide dates
    const payload = {
      clienteId: Number(this.form.value.clienteId),
      fechaInicio: `${this.form.value.fechaInicio}T00:00:00`,
      fechaFin: `${this.form.value.fechaFin}T23:59:59`
    };

    this.transaccionesService.getHistorial(payload).subscribe({
      next: (resp) => {
        if (resp.codigo_respuesta === 0 && resp.data) {
          this.transacciones = resp.data;
        } else {
          this.transacciones = [];
        }
        this.loading = false;
      },
      error: () => {
        this.transacciones = [];
        this.loading = false;
      }
    });
  }
}
