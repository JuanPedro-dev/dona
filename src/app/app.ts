import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: `
    <div class="h-screen bg-gray-50">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class App {
  protected readonly title = signal('Dona App');
}
