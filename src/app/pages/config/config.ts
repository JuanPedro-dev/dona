import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Navbar } from '@components/navbar';
import { LayoutService } from '@services/layout.service';
import { SpeechService } from '@services/speech.service';
import { ItemsStore } from '@store/word/items.store';

@Component({
  selector: 'app-config',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar],
  template: `
  <app-navbar/>
    <div
      class="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl z-10">
      <h2 class="text-xl font-bold text-gray-800">⚙️ Settings</h2>
    </div>

    

    <div class="p-5 space-y-6">
      <!-- Voice -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-1.5">🗣️ Voice</label>
        <select
          [value]="selectedVoiceName()"
          (change)="selectedVoiceChange($event)"
          class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-base bg-white">
          @for (v of voices(); track v.name) {
            <option [value]="v.name">{{ v.name }} ({{ v.lang }})</option>
          }
        </select>
      </div>

      <!-- Rate -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-1.5">
          🏃 Speed: {{ rate().toFixed(1) }}x
        </label>
        <input
          type="range"
          min="0.3"
          max="2"
          step="0.1"
          [value]="rate()"
          (input)="rateChange($event)"
          class="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600" />
        <div class="flex justify-between text-xs text-gray-400 mt-1">
          <span>Slow</span>
          <span>Normal</span>
          <span>Fast</span>
        </div>
      </div>

      <!-- Pitch -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-1.5">
          🎵 Paso: {{ pitch().toFixed(1) }}
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          [value]="pitch()"
          (input)="pitchChange($event)"
          class="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600" />
        <div class="flex justify-between text-xs text-gray-400 mt-1">
          <span>Bajo</span>
          <span>Normal</span>
          <span>Alto</span>
        </div>
      </div>

      <!-- Board -->
      <div class="border-t border-gray-200 pt-5 space-y-3">
        <h3 class="text-sm font-bold text-gray-700">🎛️ Layout</h3>

        <!-- Edit mode -->
        <button
          (click)="toggleEditMode()"
          class="w-full py-3 rounded-xl font-bold text-base transition-all"
          [class.bg-indigo-600]="isEditMode()"
          [class.text-white]="isEditMode()"
          [class.shadow-md]="isEditMode()"
          [class.bg-indigo-100]="!isEditMode()"
          [class.text-indigo-700]="!isEditMode()"
          [class.hover:bg-indigo-200]="!isEditMode()">
          {{ isEditMode() ? '🔒 Exit Edit Mode' : '✏️ Enter Edit Mode' }}
        </button>

        <!-- Reset -->
        @if (!showResetConfirm()) {
          <button
            (click)="showResetConfirm.set(true)"
            class="w-full py-3 rounded-xl bg-red-100 text-red-600 font-bold text-base hover:bg-red-200 transition-all">
            🔄 Reset All Buttons
          </button>
        } @else {
          <div class="flex gap-2">
            <button
              (click)="confirmReset()"
              class="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-all">
              ⚠️ Yes, Reset Everything
            </button>
            <button
              (click)="showResetConfirm.set(false)"
              class="px-5 py-3 rounded-xl bg-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-300 transition-all">
              Cancel
            </button>
          </div>
        }
      </div>
    </div>
  `,
})
export class Config {
  private readonly speechService = inject(SpeechService);
  private readonly itemsStore = inject(ItemsStore);
  private readonly layoutService = inject(LayoutService);
  private readonly location = inject(Location);

  // Derived from services
  protected readonly voices = this.speechService.voices;
  protected readonly selectedVoiceName = this.speechService.selectedVoiceName;
  protected readonly rate = this.speechService.rate;
  protected readonly pitch = this.speechService.pitch;
  protected readonly isEditMode = this.layoutService.isEditMode;

  protected showResetConfirm = signal(false);

  confirmReset() {
    this.itemsStore.resetToDefaults();
    this.showResetConfirm.set(false);
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

    this.location.back();
  }
}
