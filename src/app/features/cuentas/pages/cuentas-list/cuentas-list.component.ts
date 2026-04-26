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
  numeroCuenta = '';
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


    buscarCuenta(): void {
    if (!this.numeroCuenta) {
      this.cargarSaldos();
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.saldos = [];

    this.cuentasService.getCuentaByNumero(this.numeroCuenta).subscribe({
      next: (resp: any) => {
        const dataApi = resp.data ? resp.data : resp;

        if (dataApi && Object.keys(dataApi).length > 0) {

          const cuentaMapeada = {
            numeroCuenta: dataApi.numero_cuenta,
            nombreCliente: dataApi.cliente?.nombre_completo,
            tipoCuenta: dataApi.producto?.tipo_producto,
            tasaInteres: dataApi.producto?.tasa_interes,
            saldo: dataApi.saldo,
            estatus: dataApi.estatus
          };

          this.saldos = [cuentaMapeada];
        } else {
          this.saldos = [];
          this.errorMsg = 'No se encontró la cuenta';
        }

        this.calcularTotal();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = 'Error al buscar la cuenta';
        this.loading = false;
        this.saldos = [];
        this.cdr.detectChanges();
      }
    });
  }

    calcularTotal(): void {
      this.totalSaldo = this.saldos.reduce(
        (acc, curr) => acc + (Number(curr.saldo) || 0),
        0
      );
    }
      limpiarBusqueda(): void {
      this.numeroCuenta = '';
      this.errorMsg = '';
      this.cargarSaldos();
    }
}