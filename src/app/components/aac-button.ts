import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { LayoutService } from '@services/layout.service';

type AACButton = {
  label: string;
  emoji: string;
  color: string;
};

type ButtonLayout = {
  minWidth?: number;
  minHeight?: number;
  borderRadius?: number;
  fontSize?: number;
  emojiSize?: number;
  stretchToFill?: boolean;
};

@Component({
  selector: 'app-aac-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <button
      type="button"
      [style.flex]="layout().stretchToFill ? '1 1 ' + (layout().minWidth || 0) + 'px' : '0 0 ' + (layout().minWidth || 0) + 'px'"
      [style.width]="layout().stretchToFill ? '100%' : (layout().minWidth ? layout().minWidth + 'px' : 'auto')"
      [style.min-width.px]="layout().minWidth"
      [style.min-height.px]="layout().minHeight"
      [style.height.px]="layout().minHeight"
      (click)="handleClick()"
      (pointerdown)="handlePointerDown()"
      (pointerup)="handlePointerUp()"
      (pointerleave)="handlePointerUp()"
      class="relative flex flex-col items-center justify-center p-2 transition-all duration-100 select-none shadow-lg hover:shadow-xl"
      [class.scale-90]="pressed()"
      [class.brightness-90]="pressed()"
      [class.hover:scale-[1.03]]="!pressed()"
      [class.active:scale-95]="!pressed()"
      [class.ring-2]="isEditMode()"
      [class.ring-dashed]="isEditMode()"
      [class.ring-indigo-400]="isEditMode()"
      [class.ring-offset-2]="isEditMode()"
      [style.background-color]="button().color"
      [style.border-bottom]="borderColor()"
      [style.border-radius.px]="layout().borderRadius">
      @if (isEditMode()) {
        <div
          class="absolute -top-1.5 -right-1.5 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md z-10">
          ✏️
        </div>
      }

      <span class="leading-none drop-shadow-sm" [style.font-size.px]="layout().emojiSize">
        {{ button().emoji }}
      </span>

      <span
        class="mt-2 font-bold leading-tight text-center"
        [style.color]="textColor()"
        [style.text-shadow]="textShadow()"
        [style.font-size.px]="layout().fontSize">
        {{ button().label }}
      </span>
    </button>
  `,
})
export class AacButton {
  private readonly layoutService = inject(LayoutService);
  isEditMode = this.layoutService.isEditMode;
  button = input.required<AACButton>();
  layout = input<ButtonLayout>({});

  tap = output<string>();
  longPress = output<AACButton>();

  pressed = signal(false);
  private timer: ReturnType<typeof setTimeout> | null = null;

  handlePointerDown() {
    this.pressed.set(true);
    this.timer = setTimeout(() => {
      this.longPress.emit(this.button());
    }, 600);
  }

  handlePointerUp() {
    this.pressed.set(false);
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  handleClick() {
    if (this.isEditMode()) {
      this.longPress.emit(this.button());
    } else {
      this.tap.emit(this.button().label);
    }
  }

  borderColor() {
    const darker = this.darkenColor(this.button().color, 40);
    return `4px solid ${darker}`;
  }

  textColor() {
    return this.isLightColor(this.button().color) ? '#1e293b' : '#ffffff';
  }

  textShadow() {
    return this.isLightColor(this.button().color) ? 'none' : '0 1px 2px rgba(0,0,0,0.3)';
  }

  private darkenColor(hex: string, amount: number) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - amount);
    const g = Math.max(0, ((num >> 8) & 0xff) - amount);
    const b = Math.max(0, (num & 0xff) - amount);
    return `rgb(${r},${g},${b})`;
  }

  private isLightColor(hex: string): boolean {
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 170;
  }
}
