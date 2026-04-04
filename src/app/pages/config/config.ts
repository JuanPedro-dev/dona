import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-config',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>Config</p>`,
})
export class Config {}
