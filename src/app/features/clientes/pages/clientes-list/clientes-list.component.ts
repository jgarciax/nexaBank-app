import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Cliente, ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes-list',
  standalone: false,
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.scss',
})
export class ClientesListComponent implements OnInit {

  clientes: Cliente[] = [];
  error: string | null = null;

  get paisesUnicos(): number {
    return new Set(this.clientes.map(c => c.pais_nacimiento)).size;
  }

  constructor(private clientesService: ClientesService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe({
      next: data => {
        this.clientes = data;
        this.cdr.detectChanges();
      },
      error: err => {
        this.error = err.message;
        this.cdr.detectChanges();
      }
    });
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-GT', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }

  formatSexo(sexo: string): string {
    return sexo === 'M' ? 'Masculino' : 'Femenino';
  }
}