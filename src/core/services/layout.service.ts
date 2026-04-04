import { Injectable, signal, computed } from '@angular/core';
import { LayoutConfig, LayoutPreset, PRESETS } from './layout.model';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  // *************** Behavior ***************
  /**
   * When enabled, this mode will show editing controls on the UI, allowing users to modify their button layout and appearance.
   */
  readonly isEditMode = signal(false);
  /**
   * This mode hides sentences and only sound is played when buttons are pressed, ideal for users who want a more auditory experience without visual distractions.
   */
  readonly sentence = signal(false);
  /**
   * When enabled, this will play a sound every time a button is pressed.
   */
  readonly soundOnClick = signal(false);

  // Edit mode toggle
  toggleEditMode(): void {
    this.isEditMode.set(!this.isEditMode());
  }

  // Only ready mode toggle
  toggleSentence(): void {
    this.sentence.set(!this.sentence());
    if (!this.sentence()) this.soundOnClick.set(true);
  }

  // Only ready mode toggle
  toggleOnlyReadyMode(): void {
    this.isEditMode.set(!this.isEditMode());
  }

  // *************** Presets and Layout Configurations ***************
  /**
   * Presets, layout configurations that users can choose from to quickly apply a set of styles to their buttons and grid. Each preset includes properties like button size, font size, grid gap, and padding, allowing users to easily switch between different layouts without having to customize each setting individually.
   */
  private readonly presets: LayoutPreset[] = PRESETS;
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
}
