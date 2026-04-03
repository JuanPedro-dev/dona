import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ItemsStore } from '@store/word/items.store';

@Component({
  selector: 'app-grid-buttons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <h1>selectedFolderId: {{ selectedFolderId() }}</h1>
    <h1>items: {{ buttons() }}</h1>
    <div
      class="flex gap-1.5 px-3 py-2 bg-gray-100 border-b border-gray-200 overflow-x-auto scrollbar-hide">
      @for (work of words(); track work.id) {
        <button
          type="button"
          (click)="selectWord(work?.id)"
          class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all">
          <span class="text-lg">{{ work.emoji }}</span>
          <span>{{ work.label }}</span>
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class GridButtons {
  protected readonly itemsStore = inject(ItemsStore);
  protected readonly words = this.itemsStore.rootButtons;

  selectedFolderId = computed(() => this.itemsStore.selectedFolderId());
  buttons = computed(() => this.itemsStore.rootButtons());

  test = effect(() => {
    console.log('GridButtons - words changed:', this.words());
    console.log('Item Store', this.itemsStore);
    console.log('folder', this.itemsStore.selectedFolderId());
  });

  selectWord(id: string | undefined): void {
    // todo: animation
  }
}
