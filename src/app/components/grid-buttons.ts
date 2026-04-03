import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ItemsStore } from '@store/word/items.store';
import { AacButton } from './aac-button';

@Component({
  selector: 'app-grid-buttons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AacButton],
  template: `
    <div
      class="flex flex-wrap gap-8 px-3 py-4 overflow-x-auto scrollbar-hide">
      @for (word of words(); track word.id) {
        <app-aac-button
          [button]="{
            label: word.label,
            emoji: word.emoji ? word.emoji : '',
            color: word.backgroundColor,
          }"
          [isEditMode]="isEditMode()" />
      } @empty {
        <div className="flex-1 flex items-center justify-center text-gray-400 text-lg p-8">
          <div className="text-center">
            <span className="text-5xl block mb-4">📭</span>
            <p className="font-semibold">No buttons in this category</p>
            <p className="text-sm mt-1">Tap the ⚙️ Settings button to add new buttons</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class GridButtons {
  protected readonly itemsStore = inject(ItemsStore);
  protected readonly words = this.itemsStore.words;
  isEditMode = signal(true);

  selectWord(id: string | undefined): void {
    // todo: animation
  }
}
