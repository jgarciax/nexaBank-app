import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CuentasService } from '../../services/cuentas.service';

@Component({
  selector: 'app-cuentas-list',
  standalone: false,
  templateUrl: './cuentas-list.component.html',
  styleUrls: ['./cuentas-list.component.scss']
})
export class CuentasListComponent implements OnInit {

  saldos: any[] = [];
  saldosOriginal: any[] = [];
  cuentas: any[] = [];
  loading = true;
  totalSaldo = 0;
  numeroCuenta = '';
  nombreCliente = '';
  errorMsg = '';

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
        this.saldosOriginal = resp;
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
      error: (err) => console.error(err)
    });
  }

buscarCuenta(): void {
  this.errorMsg = '';
  if (this.numeroCuenta) {
    this.loading = true;
    this.saldos = [];
    this.cuentasService.getCuentaByNumero(this.numeroCuenta).subscribe({
      next: (resp: any) => {
        const dataApi = resp.data ? resp.data : resp;
        if (dataApi && Object.keys(dataApi).length > 0) {
          this.saldos = [{
            numeroCuenta: dataApi.numero_cuenta,
            nombreCliente: dataApi.cliente?.nombre_completo,
            tipoCuenta: dataApi.producto?.tipo_producto,
            tasaInteres: dataApi.producto?.tasa_interes,
            saldo: dataApi.saldo,
            estatus: dataApi.estatus
          }];
        } else {
          this.saldos = [];
          this.errorMsg = 'No se encontró la cuenta';
        }
        this.calcularTotal();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMsg = 'Error al buscar la cuenta';
        this.loading = false;
        this.saldos = [];
        this.cdr.detectChanges();
      }
    });
    return;
  }
  if (this.nombreCliente) {
    const termino = this.nombreCliente.toLowerCase().trim();
    this.saldos = this.saldosOriginal.filter(s =>
      s.nombreCliente?.toLowerCase().includes(termino)
    );
    if (this.saldos.length === 0) this.errorMsg = 'No se encontraron cuentas para ese nombre';
    this.calcularTotal();
    this.cdr.detectChanges();
    return;
  }

  this.cargarSaldos();
}
  calcularTotal(): void {
    this.totalSaldo = this.saldos.reduce(
      (acc, curr) => acc + (Number(curr.saldo) || 0), 0
    );
  }

  limpiarBusqueda(): void {
    this.numeroCuenta = '';
    this.nombreCliente = '';
    this.errorMsg = '';
    this.saldos = this.saldosOriginal;
    this.calcularTotal();
    this.cdr.detectChanges();
  }
}