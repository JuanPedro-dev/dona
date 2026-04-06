import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '@components/navbar';
import { LayoutService } from '@services/layout.service';
import { SpeechService } from '@services/speech.service';
import { ItemsStore } from '@store/word/items.store';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-config',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, RouterLink, CommonModule],
  template: `
    <div class="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <app-navbar />

      <main class="flex-1 overflow-y-auto">
        <div class="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
          <!-- Header -->
          <div class="flex flex-wrap items-center justify-between">
            <h2 class="text-2xl font-extrabold text-gray-900 tracking-tight">Opciones</h2>
            <div class="flex items-center gap-4">
              <button
                routerLink="/"
                class="group flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all active:scale-95 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-indigo-600 transition-transform group-hover:-translate-x-1">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <span class="text-sm font-bold text-gray-700">Volver</span>
              </button>

              <button
                routerLink="/add-item"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer">
                <span>➕</span>
                <span>Agregar Palabra</span>
              </button>
            </div>
          </div>

      <!-- Control Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 🗣️ Speech Section -->
        <section class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-5">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="text-xl">🗣️</span>
              <h3 class="text-lg font-bold text-gray-800">Voz y Sonido</h3>
            </div>
            <button
              (click)="testVoice()"
              class="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-bold hover:bg-indigo-100 transition-colors cursor-pointer">
              📢 Probar
            </button>
          </div>

          <div class="space-y-4">
            <!-- Voice -->
            <div>
              <label
                class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1 cursor-pointer"
                for="voice-select"
                >Voz</label
              >
              <select
                id="voice-select"
                [value]="selectedVoiceName()"
                (change)="selectedVoiceChange($event)"
                class="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-indigo-400 focus:outline-none text-gray-700 bg-gray-50/50 appearance-none transition-colors cursor-pointer">
                @for (v of voices(); track v.name) {
                  <option [value]="v.name">{{ v.name }} ({{ v.lang }})</option>
                }
              </select>
            </div>

            <!-- Speed -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label
                  class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 cursor-pointer"
                  >Velocidad</label
                >
                <span class="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg"
                  >{{ rate().toFixed(1) }}x</span
                >
              </div>
              <input
                type="range"
                min="0.3"
                max="2"
                step="0.1"
                [value]="rate()"
                (input)="rateChange($event)"
                class="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-indigo-600" />
            </div>

            <!-- Paso (Pitch) -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label
                  class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 cursor-pointer"
                  >Paso</label
                >
                <span
                  class="text-xs font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-lg"
                  >{{ pitch().toFixed(1) }}</span
                >
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                [value]="pitch()"
                (input)="pitchChange($event)"
                class="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-purple-600" />
            </div>

            <!-- Auto Speak toggle -->
            <div
              (click)="showSentenceBar() && layoutService.setAutoSpeakOnClick(!autoSpeakOnClick())"
              class="flex items-center justify-between bg-gray-50 rounded-2xl p-3 border border-gray-100 mt-2 transition-all"
              [class.cursor-pointer]="showSentenceBar()"
              [class.cursor-not-allowed]="!showSentenceBar()"
              [class.opacity-60]="!showSentenceBar()"
              [class.hover:bg-gray-100]="showSentenceBar()">
              <div class="flex flex-col">
                <span class="text-xs font-bold text-gray-700">Reproducir al Tocar</span>
                <span class="text-[10px] text-gray-400">
                  {{
                    !showSentenceBar()
                      ? 'Activado automáticamente'
                      : 'Hablar cuando se pulsa un botón'
                  }}
                </span>
              </div>
              <button
                class="w-12 h-6 rounded-full relative transition-colors duration-200 focus:outline-none"
                [class.cursor-pointer]="showSentenceBar()"
                [class.cursor-not-allowed]="!showSentenceBar()"
                [class.bg-indigo-600]="!showSentenceBar() || autoSpeakOnClick()"
                [class.bg-gray-300]="showSentenceBar() && !autoSpeakOnClick()">
                <div
                  class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200"
                  [class.translate-x-6]="!showSentenceBar() || autoSpeakOnClick()"></div>
              </button>
            </div>
          </div>
        </section>

        <!-- 🎛️ Layout Section -->
        <section class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-5">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xl">🎛️</span>
            <h3 class="text-lg font-bold text-gray-800">Diseño</h3>
          </div>

          <div class="space-y-4">
            <!-- Edit Mode Toggle -->
            <button
              (click)="toggleEditMode()"
              class="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              [class.bg-yellow-50]="isEditMode()"
              [class.text-yellow-700]="isEditMode()"
              [class.border-2]="isEditMode()"
              [class.border-yellow-200]="isEditMode()"
              [class.bg-indigo-50]="!isEditMode()"
              [class.text-indigo-700]="!isEditMode()"
              [class.border-2]="!isEditMode()"
              [class.border-indigo-100]="!isEditMode()">
              <span>{{ isEditMode() ? '🔒 Bloquear Tablero' : '✏️ Editar Tablero' }}</span>
            </button>

            <!-- Presets -->
            <div>
              <label
                class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2.5 ml-1 cursor-pointer"
                >Ajuste Rápido</label
              >
              <div class="grid grid-cols-3 gap-2">
                @for (p of allPresets(); track p.id) {
                  <button
                    (click)="layoutService.setPreset(p.id)"
                    class="py-2 px-1 rounded-xl text-[10px] font-bold border-2 transition-all truncate cursor-pointer"
                    [class.bg-indigo-600]="currentPresetId() === p.id"
                    [class.border-indigo-600]="currentPresetId() === p.id"
                    [class.text-white]="currentPresetId() === p.id"
                    [class.bg-white]="currentPresetId() !== p.id"
                    [class.border-gray-100]="currentPresetId() !== p.id"
                    [class.text-gray-500]="currentPresetId() !== p.id">
                    {{ p.name }}
                  </button>
                }
              </div>
            </div>

            <!-- Dimensions & Typography -->
            <div class="space-y-4 pt-1">
              <div class="grid grid-cols-2 gap-4">
                <!-- Width -->
                <div>
                  <div class="flex justify-between items-center mb-1.5">
                    <label
                      class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 cursor-pointer"
                      >Ancho</label
                    >
                    <span class="text-[10px] font-black text-gray-800">{{ buttonWidth() }}px</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="350"
                    [value]="buttonWidth()"
                    (input)="layoutService.setButtonWidth(+$any($event.target).value)"
                    class="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-indigo-500" />
                </div>

                <!-- Height -->
                <div>
                  <div class="flex justify-between items-center mb-1.5">
                    <label
                      class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 cursor-pointer"
                      >Alto</label
                    >
                    <span class="text-[10px] font-black text-gray-800">{{ buttonHeight() }}px</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="300"
                    [value]="buttonHeight()"
                    (input)="layoutService.setButtonHeight(+$any($event.target).value)"
                    class="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-indigo-500" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <!-- Font Size -->
                <div>
                  <div class="flex justify-between items-center mb-1.5">
                    <label
                      class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 cursor-pointer"
                      >Letra</label
                    >
                    <span class="text-[10px] font-black text-gray-800"
                      >{{ buttonFontSize() }}px</span
                    >
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="40"
                    [value]="buttonFontSize()"
                    (input)="layoutService.setButtonFontSize(+$any($event.target).value)"
                    class="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-indigo-500" />
                </div>

                <!-- Emoji Size -->
                <div>
                  <div class="flex justify-between items-center mb-1.5">
                    <label
                      class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 cursor-pointer"
                      >Emoji</label
                    >
                    <span class="text-[10px] font-black text-gray-800">{{ emojiSize() }}px</span>
                  </div>
                  <input
                    type="range"
                    min="16"
                    max="80"
                    [value]="emojiSize()"
                    (input)="layoutService.setEmojiSize(+$any($event.target).value)"
                    class="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-indigo-500" />
                </div>
              </div>

              <!-- Gap & Padding -->
              <div class="grid grid-cols-2 gap-4">
                <!-- Gap -->
                <div>
                  <div class="flex justify-between items-center mb-1.5">
                    <label
                      class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 cursor-pointer"
                      >Gap</label
                    >
                    <span class="text-[10px] font-black text-gray-800">{{ gridGap() }}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    [value]="gridGap()"
                    (input)="layoutService.setGridGap(+$any($event.target).value)"
                    class="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-indigo-500" />
                </div>

                <!-- Padding -->
                <div>
                  <div class="flex justify-between items-center mb-1.5">
                    <label
                      class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 cursor-pointer"
                      >Padding</label
                    >
                    <span class="text-[10px] font-black text-gray-800">{{ gridPadding() }}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    [value]="gridPadding()"
                    (input)="layoutService.setGridPadding(+$any($event.target).value)"
                    class="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-indigo-500" />
                </div>
              </div>

              <!-- Toggles Row -->
              <div class="space-y-2 pt-2">
                <!-- Stretch to fill toggle -->
                <div
                  (click)="layoutService.setStretchToFill(!stretchToFill())"
                  class="flex items-center justify-between bg-gray-50 rounded-2xl p-3 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-gray-700">Expander Botones</span>
                    <span class="text-[10px] text-gray-400">Ocupar todo el ancho</span>
                  </div>
                  <button
                    class="w-12 h-6 rounded-full relative transition-colors duration-200 focus:outline-none cursor-pointer"
                    [class.bg-indigo-600]="stretchToFill()"
                    [class.bg-gray-300]="!stretchToFill()">
                    <div
                      class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200"
                      [class.translate-x-6]="stretchToFill()"></div>
                  </button>
                </div>

                <!-- Sentence Bar toggle -->
                <div
                  (click)="layoutService.setShowSentenceBar(!showSentenceBar())"
                  class="flex items-center justify-between bg-gray-50 rounded-2xl p-3 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-gray-700">Barra de Oraciones</span>
                    <span class="text-[10px] text-gray-400">Mostrar/Ocultar barra superior</span>
                  </div>
                  <button
                    class="w-12 h-6 rounded-full relative transition-colors duration-200 focus:outline-none cursor-pointer"
                    [class.bg-indigo-600]="showSentenceBar()"
                    [class.bg-gray-300]="!showSentenceBar()">
                    <div
                      class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200"
                      [class.translate-x-6]="showSentenceBar()"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Advanced / Reset Card -->
      <section class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-sm font-bold text-gray-800 mb-1">Zona Peligrosa</h4>
            <p class="text-[11px] text-gray-400">
              Restablecer todos los botones a su estado original
            </p>
          </div>

          @if (!showResetConfirm()) {
            <button
              (click)="showResetConfirm.set(true)"
              class="px-5 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 transition-all border border-red-100 cursor-pointer">
              Restablecer
            </button>
          } @else {
            <div class="flex gap-2">
              <button
                (click)="confirmReset()"
                class="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-all shadow-md cursor-pointer">
                Confirmar
              </button>
              <button
                (click)="showResetConfirm.set(false)"
                class="px-4 py-2 rounded-xl bg-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-300 transition-all cursor-pointer">
                Cancelar
              </button>
            </div>
          }
        </div>
      </section>
        </div>
      </main>
    </div>
  `,
  styles: `
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      background: white;
      border: 3px solid currentColor;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `,
})
export class Config {
  private readonly speechService = inject(SpeechService);
  private readonly itemsStore = inject(ItemsStore);
  protected readonly layoutService = inject(LayoutService);
  private readonly router = inject(Router);

  // Derived from services
  protected readonly voices = this.speechService.voices;
  protected readonly selectedVoiceName = this.speechService.selectedVoiceName;
  protected readonly rate = this.speechService.rate;
  protected readonly pitch = this.speechService.pitch;

  protected readonly isEditMode = this.layoutService.isEditMode;
  protected readonly currentPresetId = this.layoutService.currentPresetId;
  protected readonly allPresets = this.layoutService.allPresets;
  protected readonly buttonWidth = this.layoutService.buttonWidth;
  protected readonly buttonHeight = this.layoutService.buttonHeight;
  protected readonly buttonFontSize = this.layoutService.buttonFontSize;
  protected readonly emojiSize = this.layoutService.emojiSize;
  protected readonly gridGap = this.layoutService.gridGap;
  protected readonly gridPadding = this.layoutService.gridPadding;
  protected readonly stretchToFill = this.layoutService.stretchToFill;
  protected readonly showSentenceBar = this.layoutService.showSentenceBar;
  protected readonly autoSpeakOnClick = this.layoutService.autoSpeakOnClick;

  protected showResetConfirm = signal(false);
  private readonly toastService = inject(ToastService);
  private toastTimer: any;
  private isInitialLoad = true;

  constructor() {
    effect(() => {
      // Track all setting signals
      this.selectedVoiceName();
      this.rate();
      this.pitch();
      this.buttonWidth();
      this.buttonHeight();
      this.buttonFontSize();
      this.emojiSize();
      this.gridGap();
      this.gridPadding();
      this.stretchToFill();
      this.showSentenceBar();
      this.autoSpeakOnClick();

      if (this.isInitialLoad) {
        this.isInitialLoad = false;
        return;
      }

      if (this.toastTimer) clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        this.toastService.success('Los cambios se actualizaron correctamente', {
          title: 'Configuración',
        });
      }, 2000);
    });
  }

  testVoice() {
    this.speechService.speak('Esta es una prueba de configuración de voz.');
  }

  async confirmReset() {
    await this.itemsStore.resetToDefaults();
    this.showResetConfirm.set(false);
    this.toastService.success('El tablero ha vuelto a su estado original', {
      title: 'Restablecido',
    });
  }

  selectedVoiceChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.speechService.setSelectedVoice(value);
  }

  pitchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.speechService.setPitch(parseFloat(value));
  }

  rateChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.speechService.setRate(parseFloat(value));
  }

  toggleEditMode() {
    this.layoutService.toggleEditMode();
    this.router.navigate(['/']);
  }
}
