import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  effect,
  inject,
} from '@angular/core';
import { AACButton, Category, COLOR_OPTIONS, EMOJI_OPTIONS } from './config.model';
import { ItemsStore } from '@store/word/items.store';

@Component({
  selector: 'app-config-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" (click)="closeModal()"></div>

        <div
          class="relative bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
          <div
            class="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl z-10">
            <h2 class="text-xl font-bold text-gray-800">
              {{ isNewButton() ? '➕ Add New Button' : '✏️ Edit Button' }}
            </h2>
            <button
              (click)="closeModal()"
              class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
              ✕
            </button>
          </div>

          <div class="p-5 space-y-5">
            <!-- Preview -->
            <div class="flex justify-center">
              <div
                class="w-24 h-24 rounded-2xl flex flex-col items-center justify-center shadow-lg"
                [style.background-color]="color()">
                <span class="text-4xl">{{ icon() || '⭐' }}</span>
                <span class="mt-1 text-xs font-bold" [style.color]="textColor()">
                  {{ label() || 'Label' }}
                </span>
              </div>
            </div>

            <!-- Label -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1.5">Label</label>
              <input
                type="text"
                [value]="label()"
                (input)="label.set($any($event.target).value)"
                class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-lg font-medium"
                maxlength="20" />
            </div>

            <!-- Category -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
              <div class="flex flex-wrap gap-1.5">
                @for (cat of categories(); track cat.id) {
                  <button
                    type="button"
                    (click)="category.set(cat.id)"
                    class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all"
                    [class.text-white]="category() === cat.id"
                    [class.shadow-md]="category() === cat.id"
                    [class.scale-105]="category() === cat.id"
                    [class.bg-gray-100]="category() !== cat.id"
                    [class.text-gray-600]="category() !== cat.id"
                    [class.hover:bg-gray-200]="category() !== cat.id"
                    [style.background-color]="category() === cat.id ? cat.color : null">
                    <span>{{ cat.icon }}</span>
                    <span>{{ cat.label }}</span>
                  </button>
                }
              </div>
            </div>

            <!-- Color -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1.5">Color</label>
              <div class="flex flex-wrap gap-2">
                @for (c of colorOptions; track c) {
                  <button
                    type="button"
                    (click)="color.set(c)"
                    class="w-10 h-10 rounded-xl transition-all"
                    [class.ring-4]="color() === c"
                    [class.ring-offset-2]="color() === c"
                    [class.ring-indigo-500]="color() === c"
                    [class.scale-110]="color() === c"
                    [class.hover:scale-105]="color() !== c"
                    [style.background-color]="c"></button>
                }

                <input
                  type="color"
                  [value]="color()"
                  (input)="color.set($any($event.target).value)"
                  class="w-10 h-10 rounded-xl border-2 border-gray-200 cursor-pointer" />
              </div>
            </div>

            <!-- Emoji -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1.5">Icon</label>

              <div
                class="grid grid-cols-10 gap-1.5 max-h-40 overflow-y-auto bg-gray-50 rounded-xl p-2">
                @for (e of emojiOptions; track e) {
                  <button
                    type="button"
                    (click)="icon.set(e)"
                    class="w-9 h-9 rounded-lg flex items-center justify-center text-xl transition-all"
                    [class.bg-indigo-100]="icon() === e"
                    [class.ring-2]="icon() === e"
                    [class.ring-indigo-500]="icon() === e"
                    [class.scale-110]="icon() === e"
                    [class.hover:bg-gray-200]="icon() !== e">
                    {{ e }}
                  </button>
                }
              </div>

              <input
                type="text"
                [value]="icon()"
                (input)="icon.set($any($event.target).value)"
                class="mt-2 w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-lg"
                maxlength="4" />
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-2">
              <button
                type="button"
                (click)="handleSave()"
                class="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md">
                {{ isNewButton() ? '➕ Add Button' : '💾 Save Changes' }}
              </button>

              @if (!isNewButton() && button()) {
                @if (!showDeleteConfirm()) {
                  <button
                    type="button"
                    (click)="showDeleteConfirm.set(true)"
                    class="px-5 py-3 rounded-xl bg-red-100 text-red-600 font-bold text-lg hover:bg-red-200 transition-all">
                    🗑️
                  </button>
                } @else {
                  <button
                    type="button"
                    (click)="handleDelete()"
                    class="px-5 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-all animate-pulse">
                    Confirm Delete
                  </button>
                }
              }
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class Config {
  private readonly itemsStore = inject(ItemsStore);
  protected readonly emojiOptions = EMOJI_OPTIONS;
  protected readonly colorOptions = COLOR_OPTIONS;

  button = input<AACButton | null>(null);
  isOpen = input(false);
  isNewButton = input(false);
  categories = input.required<Category[]>();

  save = output<{ id: string; updates: Partial<AACButton> }>();
  delete = output<string>();
  add = output<AACButton>();

  label = signal('');
  icon = signal('');
  color = signal('#3b82f6');
  category = signal('core');
  showDeleteConfirm = signal(false);

  constructor() {
    effect(() => {
      const b = this.button();
      if (b) {
        this.label.set(b.label);
        this.icon.set(b.icon);
        this.color.set(b.color);
        this.category.set(b.category);
      } else if (this.isNewButton()) {
        this.label.set('');
        this.icon.set('⭐');
        this.color.set('#3b82f6');
        this.category.set('core');
      }
      this.showDeleteConfirm.set(false);
    });
  }

  handleSave() {
    if (this.isNewButton()) {
      this.add.emit({
        id: `btn-custom-${Date.now()}`,
        label: this.label() || 'New',
        icon: this.icon() || '⭐',
        color: this.color(),
        category: this.category(),
      });
    } else if (this.button()) {
      this.save.emit({
        id: this.button()!.id,
        updates: {
          label: this.label(),
          icon: this.icon(),
          color: this.color(),
          category: this.category(),
        },
      });
    }
    this.closeModal();
  }

  handleDelete() {
    if (this.button()) {
      this.delete.emit(this.button()!.id);
      this.closeModal();
    }
  }

  textColor = computed(() => (this.isLightColor(this.color()) ? '#1e293b' : '#ffffff'));

  private isLightColor(hex: string): boolean {
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 170;
  }

  closeModal() {
    // close modal and reset state
  }
  }
