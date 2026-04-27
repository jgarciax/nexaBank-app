import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransaccionesService } from '../../services/transacciones.service';
import { CuentasService } from '../../../cuentas/services/cuentas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-transaccion-form',
  standalone: false,
  templateUrl: './transaccion-form.component.html',
  styleUrl: './transaccion-form.component.scss'
})
export class TransaccionFormComponent implements OnInit {

  form: FormGroup;
  codigos: any[] = [];
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private transaccionesService: TransaccionesService,
    private cuentasService: CuentasService,
    private router: Router
  ) {
    // Current date in local datetime-local format
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const currentDate = now.toISOString().slice(0, 16);

    this.form = this.fb.group({
      numeroCuenta: ['', Validators.required],
      fecha: [currentDate, Validators.required],
      monto: ['', [Validators.required, Validators.min(0.01)]],
      codigoOperacionId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cuentasService.getCodigosOperacion().subscribe({
      next: (resp: any[]) => {
        this.codigos = resp;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Error cargando códigos de operación';
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    this.loading = true;

    const payload = {
      ...this.form.value,
      codigoOperacionId: Number(this.form.value.codigoOperacionId)
    };

    if (payload.fecha.length === 16) {
      payload.fecha = payload.fecha + ':00';
    }

    this.transaccionesService.createTransaction(payload)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (resp) => {
          if (resp.codigo_respuesta === 0) {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: resp.descripcion_respuesta
            }).then(() => {
              this.router.navigate(['/transacciones']);
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: resp.descripcion_respuesta
            });
          }
        },
        error: (err) => {
          const mensaje = err?.error?.descripcion_respuesta || 'Error de conexión con el servidor';
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: mensaje
          });
        }
      });
      }
}
