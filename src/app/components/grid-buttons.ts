import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ItemsStore } from '@store/word/items.store';
import { LayoutService } from '@services/layout.service';
import { AacButton } from './aac-button';

@Component({
  selector: 'app-grid-buttons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AacButton],
  template: `
    <div
      class="flex flex-wrap"
      [style.gap.px]="currentPreset().gridGap"
      [style.padding.px]="currentPreset().gridPadding">
      @for (word of words(); track word.id) {
        <app-aac-button
          (click)="selectWord(word.label)"
          [class.grow]="currentPreset().stretchToFill"
          [button]="{
            label: word.label,
            emoji: word.emoji ? word.emoji : '',
            color: word.backgroundColor,
          }"
          [layout]="buttonLayout()"
          [style.flex-basis.px]="currentPreset().buttonWidth" />
      } @empty {
        <div class="flex-1 flex items-center justify-center text-gray-400 text-lg p-8">
          <div class="text-center">
            <span class="text-5xl block mb-4">📭</span>
            <p class="font-semibold">No buttons in this category</p>
            <p class="text-sm mt-1">Tap the ⚙️ Settings button to add new buttons</p>
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
  protected readonly words = this.itemsStore.words;
  protected readonly currentPreset = this.layoutService.currentPreset;
  protected readonly isEditMode = signal(true);

  protected readonly buttonLayout = computed(() => {
    const preset = this.currentPreset();
    return {
      minWidth: preset.buttonWidth,
      minHeight: preset.buttonHeight,
      borderRadius: preset.buttonBorderRadius,
      fontSize: preset.buttonFontSize,
      emojiSize: preset.emojiSize,
      stretchToFill: preset.stretchToFill,
    };
  });

  selectWord(word: string): void {
    this.itemsStore.addToSentence(word);
  }
}
