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

export const PRESETS: LayoutPreset[] = [
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
