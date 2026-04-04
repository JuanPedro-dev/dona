import { Injectable, signal, computed } from '@angular/core';

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

export interface LayoutConfig {
  minWidth: string;
  padding: string;
  borderRadius: string;
  fontSize: string;
  emojiSize: string;
  gap: string;
  gridTemplateColumns: string;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  readonly isEditMode = signal(false);

  private readonly presets: LayoutPreset[] = [
    {
      id: 'compact',
      name: 'Compacto',
      buttonWidth: 120,
      buttonHeight: 100,
      buttonBorderRadius: 16,
      buttonFontSize: 12,
      emojiSize: 28,
      gridGap: 8,
      gridPadding: 8,
      stretchToFill: false,
    },
    {
      id: 'default',
      name: 'Default',
      buttonWidth: 160,
      buttonHeight: 140,
      buttonBorderRadius: 24,
      buttonFontSize: 14,
      emojiSize: 36,
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
      emojiSize: 44,
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
      emojiSize: 56,
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
      emojiSize: 40,
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
      emojiSize: 32,
      gridGap: 10,
      gridPadding: 10,
      stretchToFill: false,
    },
  ];

  readonly currentPresetId = signal<string>('compact');

  readonly currentPreset = computed(
    () => this.presets.find(p => p.id === this.currentPresetId()) ?? this.presets[0],
  );

  readonly allPresets = computed(() => this.presets);

  getPresetById(id: string): LayoutPreset | undefined {
    return this.presets.find(p => p.id === id);
  }

  setPreset(id: string): void {
    const preset = this.presets.find(p => p.id === id);
    if (preset) {
      this.currentPresetId.set(id);
    }
  }

  getLayoutConfig(preset: LayoutPreset): LayoutConfig {
    return {
      minWidth: `${preset.buttonWidth}px`,
      padding: `${preset.gridPadding}px`,
      borderRadius: `${preset.buttonBorderRadius}px`,
      fontSize: `${preset.buttonFontSize}px`,
      emojiSize: `${preset.emojiSize}px`,
      gap: `${preset.gridGap}px`,
      gridTemplateColumns: 'repeat(auto-fill, minmax(0, 1fr))',
    };
  }

  getButtonStyles(preset: LayoutPreset): string {
    const radius = `${preset.buttonBorderRadius}px`;
    const height = `${preset.buttonHeight}px`;
    const fontSize = `${preset.buttonFontSize}px`;
    const emojiSize = `${preset.emojiSize}px`;

    return `
      min-width: ${preset.buttonWidth}px;
      min-height: ${height};
      border-radius: ${radius};
      padding: 8px;
    `;
  }

  // Edit mode toggle
  toggleEditMode(): void {
    this.isEditMode.set(!this.isEditMode());
  }
}
