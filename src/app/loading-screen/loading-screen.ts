import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loading-screen',
  standalone: false,
  templateUrl: './loading-screen.html',
  styleUrl: './loading-screen.scss',
})
export class LoadingScreen implements OnInit {

  @Output() ready = new EventEmitter<void>();

  mensaje = 'Conectando con el servidor...';
  progreso = 0;
  private interval: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.simularProgreso();
    this.pingServidor();
  }

  private simularProgreso(): void {
    this.interval = setInterval(() => {
      if (this.progreso < 85) {
        this.progreso += Math.random() * 6;
        this.actualizarMensaje();
      }
    }, 1200);
  }

  private actualizarMensaje(): void {
    if (this.progreso < 25) this.mensaje = 'Iniciando servicios...';
    else if (this.progreso < 50) this.mensaje = 'Cargando módulos del sistema...';
    else if (this.progreso < 70) this.mensaje = 'Verificando conexión segura...';
    else this.mensaje = 'Casi listo...';
  }

  private pingServidor(): void {
    const ping = () => {
      this.http.get('https://nexabank-api-dtr6.onrender.com/cuenta').subscribe({
        next: () => {
          clearInterval(this.interval);
          this.progreso = 100;
          this.mensaje = '¡Sistema listo!';
          setTimeout(() => this.ready.emit(), 600);
        },
        error: () => {
          setTimeout(() => ping(), 4000);
        }
      });
    };
    ping();
  }
}
