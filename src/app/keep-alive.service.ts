// keep-alive.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class KeepAliveService implements OnDestroy {

  private readonly URL = 'https://nexabank-api-dtr6.onrender.com/cuenta';
  private readonly INTERVALO_MS = 10 * 60 * 1000;
  private timer: any;

  constructor(private http: HttpClient) {}

  iniciar(): void {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.http.get(this.URL).subscribe({ error: () => {} });
    }, this.INTERVALO_MS);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}