import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>Add Item</p>`,
})
export class AddItem {}
