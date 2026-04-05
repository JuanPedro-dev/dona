import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ItemsStore } from '@store/word/items.store';
import { EMOJI_OPTIONS, COLOR_OPTIONS } from './add.model';
import { CreateItemPayload } from '@store/word/item.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navbar } from '@components/navbar';

@Component({
  selector: 'app-add-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, ReactiveFormsModule],
  template: `
    <div>
      <app-navbar />
      <div class="p-5 space-y-5">
        <!-- Preview -->
        <div class="flex justify-center">
          <div
            class="w-24 h-24 rounded-2xl flex flex-col items-center justify-center shadow-lg"
            [style.background-color]="bgValue">
            <span class="text-4xl">{{ iconValue || '' }}</span>
            <span class="mt-1 text-xs font-bold text-white">
              {{ labelValue || 'Texto' }}
            </span>
          </div>
        </div>

        <form [formGroup]="form" (ngSubmit)="save()" novalidate>
          <div class="section">
            <p class="block text-sm font-bold text-gray-700 mb-1.5">
              Texto <span class="text-red-500 ml-0.5">*</span>
            </p>
            <input
              class="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-lg "
              [class.error]="labelCtrl.invalid && labelCtrl.touched"
              type="text"
              formControlName="label"
              placeholder="Ej: Quiero agua"
              maxlength="20"
              autocomplete="off"
              aria-label="Texto del botón" />

            @if (labelCtrl.touched && labelCtrl.hasError('required')) {
              <p class="field-error" role="alert">El texto es obligatorio.</p>
            }
            @if (labelCtrl.touched && labelCtrl.hasError('maxlength')) {
              <p class="field-error" role="alert">Máximo 20 caracteres.</p>
            }
          </div>

                    <!-- Category -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
            <div class="flex flex-wrap gap-1.5">
              @for (cat of categoryList(); track cat.id) {
                <button
                  type="button"
                  (click)="categorySelected.set(cat.id)"
                  class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all"
                  [class.text-white]="category() === cat.id"
                  [class.shadow-md]="category() === cat.id"
                  [class.scale-105]="category() === cat.id"
                  [class.bg-gray-100]="category() !== cat.id"
                  [class.text-gray-600]="category() !== cat.id"
                  [class.hover:bg-gray-200]="category() !== cat.id"
                  [style.background-color]="category() === cat.id ? cat.backgroundColor : null">
                  <span>{{ cat.emoji }}</span>
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
                  (click)="backgroundColor.set(c)"
                  class="w-10 h-10 rounded-xl transition-all"
                  [class.ring-4]="backgroundColor() === c"
                  [class.ring-offset-2]="backgroundColor() === c"
                  [class.ring-indigo-500]="backgroundColor() === c"
                  [class.scale-110]="backgroundColor() === c"
                  [class.hover:scale-105]="backgroundColor() !== c"
                  [style.background-color]="c"></button>
              }

              <input
                type="color"
                [value]="backgroundColor()"
                (input)="backgroundColor.set($any($event.target).value)"
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
              (click)="save()"
              class="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md">
              Guardar cambios
            </button>
          </div>
          
        </form>
      </div>
    </div>
  `,
})
export class AddItem {
  private readonly itemsStore = inject(ItemsStore);
  private readonly fb = inject(FormBuilder);

  protected readonly emojiOptions = EMOJI_OPTIONS;
  protected readonly colorOptions = COLOR_OPTIONS;
  readonly categoryList = this.itemsStore.rootFolders;

  // Form
  form = this.fb.group({
    label: ['', [Validators.required, Validators.maxLength(20)]],
    emoji: ['', [Validators.required]],
    backgroundColor: [COLOR_OPTIONS[0] ?? '#3b82f6', [Validators.required]],
    folderId: ['folder-core', [Validators.required]],
  });

  get labelValue() {
    return this.form.get('label')?.value;
  }

  get bgValue() {
    return this.form.get('label')?.value;
  }

  get iconValue() {
    return this.form.get('emoji')?.value;
  }

  get labelCtrl() {
    return this.form.controls.label;
  }
  get emojiCtrl() {
    return this.form.controls.emoji;
  }
  get bgCtrl() {
    return this.form.controls.backgroundColor;
  }
  get folderIdCtrl() {
    return this.form.controls.folderId;
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const nextOrder = this.itemsStore.items().filter(i => i.folderId === raw.folderId).length;

    const payload: CreateItemPayload = {
      type: 'button',
      label: raw.label!,
      emoji: raw.emoji!,
      backgroundColor: raw.backgroundColor!,
      textColor: '#ffffff',
      folderId: raw.folderId!,
      order: nextOrder,
    };

    this.itemsStore.addItem(payload);
    this.form.reset({
      label: '',
      emoji: '',
      backgroundColor: COLOR_OPTIONS[0] ?? '#3b82f6',
      folderId: raw.folderId,
    });
  }
}
