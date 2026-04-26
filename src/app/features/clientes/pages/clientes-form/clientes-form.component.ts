import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-clientes-form',
  standalone: false,
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.scss',
})
export class ClientesFormComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombreCompleto: ['', Validators.required],
      dpi: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      paisNacimiento: ['', Validators.required]
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    this.clientesService.createCliente(this.form.value).subscribe(() => {
      this.router.navigate(['/clientes']);
    });
  }
}
