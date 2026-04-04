import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ItemsStore } from '@store/word/items.store';
import { LayoutService } from '@services/layout.service';
import { SpeechService } from '@services/speech.service';
import { AacButton } from './aac-button';

@Component({
  selector: 'app-grid-buttons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AacButton],
  template: `
    <div
      class="flex flex-wrap"
      [style.gap.px]="layoutService.gridGap()"
      [style.padding.px]="layoutService.gridPadding()">
      @for (word of words(); track word.id) {
        <app-aac-button
          (click)="selectWord(word.label)"
          [class.grow]="layoutService.stretchToFill()"
          [button]="{
            label: word.label,
            emoji: word.emoji ? word.emoji : '',
            color: word.backgroundColor,
          }"
          [layout]="buttonLayout()" />
      } @empty {
        <div class="flex-1 flex items-center justify-center text-gray-400 text-lg p-8">
          <div class="text-center">
            <span class="text-5xl block mb-4">📭</span>
            <p class="font-semibold">No hay botones en esta categoría</p>
            <p class="text-sm mt-1">Toca el botón ⚙️ Ajustes para agregar nuevos botones</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class GridButtons {
  protected readonly itemsStore = inject(ItemsStore);
  protected readonly layoutService = inject(LayoutService);
  protected readonly speechService = inject(SpeechService);
  protected readonly words = this.itemsStore.words;

  protected readonly buttonLayout = computed(() => {
    return {
      minWidth: this.layoutService.buttonWidth(),
      minHeight: this.layoutService.buttonHeight(),
      borderRadius: this.layoutService.buttonBorderRadius(),
      fontSize: this.layoutService.buttonFontSize(),
      emojiSize: this.layoutService.emojiSize(),
      stretchToFill: this.layoutService.stretchToFill(),
    };
  });

  selectWord(word: string): void {
    const showSentenceBar = this.layoutService.showSentenceBar();
    const autoSpeakOnClick = this.layoutService.autoSpeakOnClick();

    if (!showSentenceBar) {
      // If sentence bar is hidden, we peak immediately and don't add to sentence
      this.speechService.speak(word);
    } else {
      // If sentence bar is visible, we add to sentence
      this.itemsStore.addToSentence(word);
      // And we might also speak immediately if configured
      if (autoSpeakOnClick) {
        this.speechService.speak(word);
      }
    }
  }
}
