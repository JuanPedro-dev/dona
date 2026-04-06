import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Toast } from '@components/toast';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Toast],
  template: `
    <app-toast />
    <router-outlet />
  `,
  styles: ``,
})
export class App {
  protected readonly title = signal('Dona App');
}
