import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p class="p-8 text-center text-gray-500 font-bold">Página no encontrada</p>`,
})
export class NotFound {}
