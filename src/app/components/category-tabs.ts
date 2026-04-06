import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ItemsStore } from '@store/word/items.store';
import { RouterLink } from '@angular/router';
import { LayoutService } from '@services/layout.service';

@Component({
  selector: 'app-category-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div
      role="tablist"
      aria-label="Categorías de palabras"
      class="flex gap-1.5 px-3 py-2 bg-gray-100 border-b border-gray-200 overflow-x-auto scrollbar-hide">
      <button
        type="button"
        role="tab"
        [attr.aria-selected]="activeCategory() === 'all'"
        (click)="handleSelect('all')"
        class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer"
        [class.text-white]="activeCategory() === 'all'"
        [class.bg-indigo-600]="activeCategory() === 'all'"
        [class.shadow-lg]="activeCategory() === 'all'"
        [class.bg-white]="activeCategory() !== 'all'"
        [class.text-gray-600]="activeCategory() !== 'all'"
        [class.border]="activeCategory() !== 'all'"
        [class.border-gray-200]="activeCategory() !== 'all'">
        <span class="text-lg" aria-hidden="true">🌟</span>
        <span>Todas</span>
      </button>

      @for (cat of categories(); track cat.id) {
        <button
          type="button"
          role="tab"
          [attr.aria-selected]="activeCategory() === cat.id"
          [attr.aria-label]="'Categoría ' + cat.label"
          (click)="handleSelect(cat?.id)"
          class="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer"
          [class.shadow-lg]="activeCategory() === cat?.id"
          [class.scale-105]="activeCategory() === cat?.id"
          [class.bg-white]="activeCategory() !== cat?.id"
          [class.text-gray-600]="activeCategory() !== cat?.id"
          [class.hover:bg-gray-200]="activeCategory() !== cat?.id"
          [class.border]="activeCategory() !== cat?.id"
          [class.border-gray-200]="activeCategory() !== cat?.id"
          [style.background-color]="activeCategory() === cat?.id ? cat?.backgroundColor : null"
          [style.color]="activeCategory() === cat?.id ? getTextColor(cat.backgroundColor) : null">
          @if (isEditMode()) {
            <div
              (click)="$event.stopPropagation()"
              [routerLink]="['/edit-item', cat?.id]"
              aria-label="Editar categoría"
              class="absolute -top-1.5 -right-1.5 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md z-10 transition-transform hover:scale-110">
              ✏️
            </div>
          }

          <span class="text-lg" aria-hidden="true">{{ cat.emoji }}</span>
          <span>{{ cat.label }}</span>
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class CategoryTabs {
  protected readonly itemsStore = inject(ItemsStore);
  protected readonly layoutService = inject(LayoutService);

  protected readonly isEditMode = this.layoutService.isEditMode;
  protected readonly categories = this.itemsStore.rootFolders;
  protected readonly activeCategory = this.itemsStore.selectedFolderId;

  handleSelect(id: string | undefined): void {
    this.itemsStore.selectFolder(id ?? '');
  }

  protected getTextColor(backgroundColor: string): string {
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 170 ? '#1e293b' : '#ffffff';
  }
}
