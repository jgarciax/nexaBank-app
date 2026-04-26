import { Component, OnInit } from '@angular/core';
import { Cliente, ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes-list',
  standalone: false,
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.scss',
})
export class ClientesListComponent implements OnInit {

  clientes: Cliente[] = [];

  get paisesUnicos(): number {
    return new Set(this.clientes.map(c => c.paisNacimiento)).size;
  }

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }
}
