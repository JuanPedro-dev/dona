import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Toast } from '@components/toast';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Toast],
  template: `
    <app-toast />
    toast: <button (click)="ejecutar()">Show Toast</button>
    <router-outlet />
  `,
  styles: ``,
})
export class App {
  protected readonly title = signal('Dona App');
  readonly toastService = inject(ToastService);

  // Ahora puedes usarlo así:
  ejecutar() {
    this.toastService.success('¡Operación exitosa!');
    this.toastService.error('Algo salió mal', { title: 'Ups' });
    this.toastService.info('Esto es solo información');
    this.toastService.warning('Cuidado con esto', { duration: 5000 });
  }
}
