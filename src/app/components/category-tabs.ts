import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ItemsStore } from '@store/word/items.store';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-category-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div
      class="flex gap-1.5 px-3 py-2 bg-gray-100 border-b border-gray-200 overflow-x-auto scrollbar-hide">
      @for (cat of categories(); track cat.id) {
        <button
          type="button"
          (click)="handleSelect(cat?.id)"
          [routerLink]="['/edit-item', cat?.id]"
          class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all"
          [class.text-white]="activeCategory() === cat?.id"
          [class.shadow-lg]="activeCategory() === cat?.id"
          [class.scale-105]="activeCategory() === cat?.id"
          [class.bg-white]="activeCategory() !== cat?.id"
          [class.text-gray-600]="activeCategory() !== cat?.id"
          [class.hover:bg-gray-200]="activeCategory() !== cat?.id"
          [class.border]="activeCategory() !== cat?.id"
          [class.border-gray-200]="activeCategory() !== cat?.id"
          [style.background-color]="activeCategory() === cat?.id ? cat?.backgroundColor : null">
          <span class="text-lg">{{ cat.emoji }}</span>
          <span>{{ cat.label }}</span>
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class CategoryTabs {
  protected readonly itemsStore = inject(ItemsStore);

  protected readonly categories = this.itemsStore.rootFolders;
  protected readonly activeCategory = this.itemsStore.selectedFolderId;

  handleSelect(id: string | undefined): void {
    this.itemsStore.selectFolder(id ?? '');
  }
}
