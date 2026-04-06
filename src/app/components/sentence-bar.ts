import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SpeechService } from '@services/speech.service';
import { ItemsStore } from '@store/word/items.store';

@Component({
  selector: 'app-sentence-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  template: `
    <div
      class="flex flex-wrap justify-end gap-2 bg-white border-b-2 border-gray-200 px-3 py-2 shadow-sm">
      <!-- Sentence display -->
      <div
        class="basis-xs overflow-x-auto scrollbar-hide flex-1 min-h-13 bg-gray-50 rounded-xl px-4 py-2 flex justify-around gap-1 cursor-pointer border-2 border-gray-200 overflow-hidden"
        (click)="speakOrStop()"
        title="Tap to speak sentence">
        @if (sentence().length === 0) {
          <span class="text-gray-400 text-lg select-none">
            Haz click en los botones para construir una oración...
          </span>
        } @else {
          @for (word of sentence(); track $index) {
            <span
              class="inline-block bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-lg text-base font-semibold">
              {{ word }}
            </span>
          }
        }
      </div>

      <div class="flex gap-2 justify-end">
        <!-- Speak button -->
        <button
          (click)="speakOrStop()"
          [disabled]="sentence().length === 0"
          class="shrink-0 w-13 h-13 rounded-xl flex items-center justify-center text-2xl transition-all"
          [ngClass]="{
            'bg-gray-200 text-gray-400 cursor-not-allowed': sentence().length === 0,
            'bg-red-500 text-white animate-pulse': sentence().length > 0 && isSpeaking(),
            'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-md':
              sentence().length > 0 && !isSpeaking(),
          }"
          title="Speak sentence">
          {{ isSpeaking() ? '⏸️' : '▶️' }}
        </button>

        <!-- Backspace -->
        <button
          (click)="removeLast()"
          [disabled]="sentence().length === 0"
          class="shrink-0 w-13 h-13 rounded-xl bg-amber-500 text-white flex items-center justify-center text-2xl
        hover:bg-amber-600 active:scale-95 transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-md"
          title="Delete last word">
          ⌫
        </button>

        <!-- Clear -->
        <button
          (click)="clearSentence()"
          [disabled]="sentence().length === 0"
          class="shrink-0 w-13 h-13 rounded-xl bg-red-500 text-white flex items-center justify-center text-2xl
        hover:bg-red-600 active:scale-95 transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-md"
          title="Clear sentence">
          🗑️
        </button>
      </div>
    </div>
  `,
})
export class SentenceBar {
  private readonly itemsStore = inject(ItemsStore);
  private readonly speechService = inject(SpeechService);

  protected readonly sentence = this.itemsStore.sentence;
  protected readonly isSpeaking = this.speechService.isSpeaking;

  clearSentence(): void {
    this.itemsStore.clearSentence();
  }

  removeLast(): void {
    this.itemsStore.removeLastSentence();
  }

  speakOrStop(): void {
    if (this.speechService.isSpeaking()) {
      this.speechService.stop();
    } else {
      this.speechService.speak(this.itemsStore.sentence().join(' '));
    }
  }
}
