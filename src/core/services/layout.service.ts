import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { IndexedDbService } from './indexed-db.service';

export interface LayoutPreset {
  id: string;
  name: string;
  buttonWidth: number;
  buttonHeight: number;
  buttonBorderRadius: number;
  buttonFontSize: number;
  emojiSize: number;
  gridGap: number;
  gridPadding: number;
  stretchToFill: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly db = inject(IndexedDbService);

  readonly isEditMode = signal(false);

  private readonly presets: LayoutPreset[] = [
    {
      id: 'compact',
      name: 'Compacto',
      buttonWidth: 120,
      buttonHeight: 100,
      buttonBorderRadius: 16,
      buttonFontSize: 12,
      emojiSize: 24,
      gridGap: 8,
      gridPadding: 8,
      stretchToFill: true,
    },
    {
      id: 'default',
      name: 'Default',
      buttonWidth: 160,
      buttonHeight: 140,
      buttonBorderRadius: 24,
      buttonFontSize: 14,
      emojiSize: 32,
      gridGap: 12,
      gridPadding: 12,
      stretchToFill: false,
    },
    {
      id: 'comfortable',
      name: 'Cómodo',
      buttonWidth: 200,
      buttonHeight: 180,
      buttonBorderRadius: 28,
      buttonFontSize: 16,
      emojiSize: 40,
      gridGap: 16,
      gridPadding: 16,
      stretchToFill: false,
    },
    {
      id: 'large',
      name: 'Grande',
      buttonWidth: 240,
      buttonHeight: 200,
      buttonBorderRadius: 32,
      buttonFontSize: 20,
      emojiSize: 52,
      gridGap: 20,
      gridPadding: 20,
      stretchToFill: true,
    },
    {
      id: 'tablet',
      name: 'Tableta',
      buttonWidth: 180,
      buttonHeight: 160,
      buttonBorderRadius: 24,
      buttonFontSize: 14,
      emojiSize: 36,
      gridGap: 14,
      gridPadding: 14,
      stretchToFill: false,
    },
    {
      id: 'phone',
      name: 'Teléfono',
      buttonWidth: 140,
      buttonHeight: 120,
      buttonBorderRadius: 20,
      buttonFontSize: 13,
      emojiSize: 28,
      gridGap: 10,
      gridPadding: 10,
      stretchToFill: false,
    },
  ];

  // Individual signals for customization
  readonly currentPresetId = signal<string>('compact');
  readonly buttonWidth = signal(120);
  readonly buttonHeight = signal(100);
  readonly buttonBorderRadius = signal(16);
  readonly buttonFontSize = signal(12);
  readonly emojiSize = signal(24);
  readonly gridGap = signal(8);
  readonly gridPadding = signal(8);
  readonly stretchToFill = signal(false);

  // New application logic toggles
  readonly showSentenceBar = signal(true);
  readonly autoSpeakOnClick = signal(true);

  readonly allPresets = computed(() => this.presets);

  constructor() {
    this.loadSettings();

    // Effect to persist changes
    effect(() => {
      const settings = {
        currentPresetId: this.currentPresetId(),
        buttonWidth: this.buttonWidth(),
        buttonHeight: this.buttonHeight(),
        buttonBorderRadius: this.buttonBorderRadius(),
        buttonFontSize: this.buttonFontSize(),
        emojiSize: this.emojiSize(),
        gridGap: this.gridGap(),
        gridPadding: this.gridPadding(),
        stretchToFill: this.stretchToFill(),
        showSentenceBar: this.showSentenceBar(),
        autoSpeakOnClick: this.autoSpeakOnClick(),
      };
      this.db.savePreference('layout-settings', settings);
    });
  }

  private async loadSettings() {
    const saved = await this.db.getPreference<any>('layout-settings');
    if (saved) {
      this.currentPresetId.set(saved.currentPresetId ?? 'compact');
      this.buttonWidth.set(saved.buttonWidth ?? 160);
      this.buttonHeight.set(saved.buttonHeight ?? 140);
      this.buttonBorderRadius.set(saved.buttonBorderRadius ?? 24);
      this.buttonFontSize.set(saved.buttonFontSize ?? 14);
      this.emojiSize.set(saved.emojiSize ?? 32);
      this.gridGap.set(saved.gridGap ?? 12);
      this.gridPadding.set(saved.gridPadding ?? 12);
      this.stretchToFill.set(saved.stretchToFill ?? false);
      this.showSentenceBar.set(saved.showSentenceBar ?? true);
      this.autoSpeakOnClick.set(saved.autoSpeakOnClick ?? true);
    } else {
      // Default initial state
      this.setPreset('compact');
    }
  }

  setPreset(id: string): void {
    const preset = this.presets.find(p => p.id === id);
    if (preset) {
      this.currentPresetId.set(id);
      this.buttonWidth.set(preset.buttonWidth);
      this.buttonHeight.set(preset.buttonHeight);
      this.buttonBorderRadius.set(preset.buttonBorderRadius);
      this.buttonFontSize.set(preset.buttonFontSize);
      this.emojiSize.set(preset.emojiSize);
      this.gridGap.set(preset.gridGap);
      this.gridPadding.set(preset.gridPadding);
      this.stretchToFill.set(preset.stretchToFill);
    }
  }

  // Update methods for individual properties
  setButtonWidth(value: number) { this.buttonWidth.set(value); }
  setButtonHeight(value: number) { this.buttonHeight.set(value); }
  setButtonFontSize(value: number) { this.buttonFontSize.set(value); }
  setEmojiSize(value: number) { this.emojiSize.set(value); }
  setStretchToFill(value: boolean) { this.stretchToFill.set(value); }
  setGridGap(value: number) { this.gridGap.set(value); }
  setGridPadding(value: number) { this.gridPadding.set(value); }
  
  setShowSentenceBar(value: boolean) { this.showSentenceBar.set(value); }
  setAutoSpeakOnClick(value: boolean) { this.autoSpeakOnClick.set(value); }

  toggleEditMode(): void {
    this.isEditMode.set(!this.isEditMode());
  }
}
