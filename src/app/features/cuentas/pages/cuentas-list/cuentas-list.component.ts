import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CuentasService } from '../../services/cuentas.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cuentas-list',
  standalone: false,
  templateUrl: './cuentas-list.component.html',
  styleUrls: ['./cuentas-list.component.scss']
})
export class CuentasListComponent implements OnInit {

  saldos: any[] = [];
  cuentas: any[] = [];
  loading = true;
  totalSaldo = 0;

  constructor(
    private cuentasService: CuentasService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarSaldos();
    this.cargarCuentas();
  }

  get cuentasActivas(): number {
    return this.cuentas.filter(c => c.estatus === 'ACTIVA').length;
  }
  cargarSaldos(): void {
    this.loading = true;

    this.cuentasService.getSaldoCuentas().subscribe({
      next: (resp: any[]) => {
  this.saldos = resp;
        this.calcularTotal();

        this.loading = false;

        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cargarCuentas(): void {
    this.cuentasService.getCuentas().subscribe({
      next: (resp: any[]) => {
        this.cuentas = resp;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  calcularTotal(): void {
    this.totalSaldo = this.saldos.reduce(
      (acc, curr) => acc + (Number(curr.saldo) || 0),
      0
    );
  }
}