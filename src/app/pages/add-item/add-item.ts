import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ItemsStore } from '@store/word/items.store';
import { EMOJI_OPTIONS, COLOR_OPTIONS } from './add.model';
import { CreateItemPayload, ItemType } from '@store/word/item.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navbar } from '@components/navbar';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-add-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, ReactiveFormsModule, RouterLink],
  template: `
    <div class="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <app-navbar />

      <main class="flex-1 overflow-y-auto">
        <div class=" p-4 sm:p-6 space-y-6">
          <!-- Header -->
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-extrabold text-gray-900 tracking-tight">
              Añadir {{ typeValue() === 'button' ? 'Palabra' : 'Categoría' }}
            </h2>
            <button
              routerLink="/"
              class="group flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all active:scale-95 cursor-pointer">
              <span class="text-sm font-bold text-gray-700">Volver</span>
            </button>
          </div>

          <!-- Preview & Form -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Preview Card -->
            <div class="md:col-span-1">
              <div
                class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center gap-4 sticky top-0">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vista Previa</p>
                <div
                  class="w-32 h-32 rounded-3xl flex flex-col items-center justify-center shadow-xl transition-all duration-300"
                  [style.background-color]="bgValue()">
                  <span class="text-5xl drop-shadow-sm">{{ emojiValue() || '❓' }}</span>
                  <span class="mt-2 text-sm font-black text-white px-2 text-center leading-tight truncate w-full">
                    {{ labelValue() || 'Texto' }}
                  </span>
                </div>
                <p class="text-[10px] text-gray-400 text-center leading-relaxed">
                  Así es como se verá tu {{ typeValue() === 'button' ? 'botón' : 'categoría' }} en el tablero.
                </p>
              </div>
            </div>

            <!-- Form Card -->
            <div class="md:col-span-2 space-y-6">
              <form
                [formGroup]="form"
                (ngSubmit)="save()"
                class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-5">
                
                <!-- Type Selection (Segmented Control) -->
                <div>
                  <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                    ¿Qué quieres crear?
                  </label>
                  <div class="flex bg-gray-100 p-1 rounded-2xl w-full">
                    <button
                      type="button"
                      (click)="setType('button')"
                      class="flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer"
                      [class.bg-white]="typeValue() === 'button'"
                      [class.shadow-sm]="typeValue() === 'button'"
                      [class.text-indigo-600]="typeValue() === 'button'"
                      [class.text-gray-500]="typeValue() !== 'button'">
                      Palabra
                    </button>
                    <button
                      type="button"
                      (click)="setType('folder')"
                      class="flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer"
                      [class.bg-white]="typeValue() === 'folder'"
                      [class.shadow-sm]="typeValue() === 'folder'"
                      [class.text-indigo-600]="typeValue() === 'folder'"
                      [class.text-gray-500]="typeValue() !== 'folder'">
                      Categoría
                    </button>
                  </div>
                </div>

                <!-- Label -->
                <div>
                  <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1" for="label">
                    {{ typeValue() === 'button' ? 'Texto de la palabra' : 'Nombre de la categoría' }}
                  </label>
                  <input
                    id="label"
                    type="text"
                    formControlName="label"
                    [placeholder]="typeValue() === 'button' ? 'Ej: Quiero agua' : 'Ej: Comida'"
                    class="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-indigo-400 focus:outline-none text-gray-700 bg-gray-50/50 transition-colors"
                    [class.border-red-200]="labelCtrl.invalid && labelCtrl.touched" />
                  @if (labelCtrl.touched && labelCtrl.hasError('required')) {
                    <p class="text-[10px] font-bold text-red-500 mt-1 ml-1">El nombre es obligatorio.</p>
                  }
                </div>

                <!-- Folder / Category Selection - Only for buttons -->
                @if (typeValue() === 'button') {
                  <div>
                    <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                      Ubicación (Carpeta)
                    </label>
                    <div class="flex flex-wrap gap-2">
                      @for (folder of categories(); track folder.id) {
                        <button
                          type="button"
                          (click)="setFolder(folder.id)"
                          class="px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer flex items-center gap-1.5"
                          [class.bg-indigo-600]="folderIdValue() === folder.id"
                          [class.border-indigo-600]="folderIdValue() === folder.id"
                          [class.text-white]="folderIdValue() === folder.id"
                          [class.bg-white]="folderIdValue() !== folder.id"
                          [class.border-gray-100]="folderIdValue() !== folder.id"
                          [class.text-gray-500]="folderIdValue() !== folder.id">
                          <span>{{ folder.emoji }}</span>
                          <span>{{ folder.label }}</span>
                        </button>
                      }
                    </div>
                  </div>
                }

                <!-- Color Selection -->
                <div>
                  <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Color de Fondo
                  </label>
                  <div class="flex flex-wrap gap-2.5">
                    @for (color of colorOptions; track color) {
                      <button
                        type="button"
                        (click)="setColor(color)"
                        class="w-10 h-10 rounded-xl transition-all border-2 border-transparent cursor-pointer shadow-sm hover:scale-105 active:scale-90"
                        [style.background-color]="color"
                        [class.ring-4]="bgValue() === color"
                        [class.ring-indigo-200]="bgValue() === color"
                        [class.scale-110]="bgValue() === color"
                        [attr.aria-label]="'Seleccionar color ' + color"></button>
                    }
                    <div class="relative w-10 h-10 rounded-xl border-2 border-gray-100 overflow-hidden bg-white group shadow-sm">
                      <input
                        type="color"
                        [value]="bgValue()"
                        (input)="setColor($any($event.target).value)"
                        class="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer" />
                    </div>
                  </div>
                </div>

                <!-- Emoji Selection -->
                <div>
                  <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Icono (Emoji)
                  </label>
                  <div class="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1 bg-gray-50/50 rounded-2xl border border-gray-100">
                    @for (em of emojiOptions; track em) {
                      <button
                        type="button"
                        (click)="setEmoji(em)"
                        class="aspect-square flex items-center justify-center text-2xl rounded-xl transition-all cursor-pointer hover:bg-white hover:shadow-sm active:scale-90"
                        [class.bg-white]="emojiValue() === em"
                        [class.shadow-md]="emojiValue() === em"
                        [class.ring-2]="emojiValue() === em"
                        [class.ring-indigo-400]="emojiValue() === em">
                        {{ em }}
                      </button>
                    }
                  </div>
                  <div class="mt-3">
                    <input
                      type="text"
                      [value]="emojiValue()"
                      (input)="setEmoji($any($event.target).value)"
                      placeholder="Usa un emoji personalizado..."
                      maxlength="4"
                      class="w-full px-4 py-2 rounded-xl border border-gray-100 focus:border-indigo-400 focus:outline-none text-sm text-gray-600 bg-white shadow-inner" />
                  </div>
                </div>

                <!-- Action Button -->
                <button
                  type="submit"
                  class="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-lg uppercase tracking-wider shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all cursor-pointer mt-4">
                  Guardar Palabra
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: `
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #e2e8f0;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #cbd5e1;
    }
  `,
})
export class AddItem {
  private readonly itemsStore = inject(ItemsStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  protected readonly emojiOptions = EMOJI_OPTIONS;
  protected readonly colorOptions = COLOR_OPTIONS;
  protected readonly categories = this.itemsStore.rootFolders;

  // Form initialization
  protected form = this.fb.group({
    type: ['button' as ItemType],
    label: ['', [Validators.required, Validators.maxLength(20)]],
    emoji: ['😊'],
    backgroundColor: [COLOR_OPTIONS[3] ?? '#3b82f6', [Validators.required]],
    folderId: [this.categories()[0]?.id ?? 'folder-core'],
  });

  // Getters for preview
  protected typeValue() { return this.form.controls.type.value; }
  protected labelValue() { return this.form.controls.label.value; }
  protected emojiValue() { return this.form.controls.emoji.value; }
  protected bgValue() { return this.form.controls.backgroundColor.value; }
  protected folderIdValue() { return this.form.controls.folderId.value; }

  // Control helpers
  get labelCtrl() { return this.form.controls.label; }

  setType(type: ItemType) {
    this.form.controls.type.setValue(type);
    if (type === 'folder') {
      this.form.controls.folderId.setValue(null);
    } else {
      this.form.controls.folderId.setValue(this.categories()[0]?.id ?? 'folder-core');
    }
  }

  setEmoji(em: string) {
    this.form.controls.emoji.setValue(em);
  }

  setColor(color: string) {
    this.form.controls.backgroundColor.setValue(color);
  }

  setFolder(id: string | null) {
    this.form.controls.folderId.setValue(id);
  }

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { type, label, emoji, backgroundColor, folderId } = this.form.getRawValue();

    // Calculate order based on existing items in that folder/root
    const itemsInLocation = this.itemsStore.items().filter(i => i.folderId === folderId && i.type === type);
    const nextOrder = itemsInLocation.length;

    const payload: CreateItemPayload = {
      type: type!,
      label: label!,
      emoji: emoji!,
      backgroundColor: backgroundColor!,
      textColor: '#ffffff',
      folderId: type === 'folder' ? null : folderId,
      order: nextOrder,
    };

    try {
      await this.itemsStore.addItem(payload);
      this.toastService.success(type === 'button' ? 'Palabra agregada exitosamente.' : 'Categoría agregada exitosamente.');

      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }
}
