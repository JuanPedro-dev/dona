import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-edit-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>Edit Item: {{ id() }}</p>`,
})
export class EditItem {
  readonly id = input<string>();
}
