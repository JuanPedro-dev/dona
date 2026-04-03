import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';

@Component({
  selector: 'dona-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'inline-flex',
  },
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="buttonClasses()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-pressed]="ariaPressed()"
      (click)="handleClick($event)"
      (keydown.enter)="handleClick($event)"
      (keydown.space)="handleClick($event)"
    >
      <ng-content />
    </button>
  `,
  styles: `
    :host { display: inline-flex; }
  `,
})
export class DonaButton {
  variant = input<'primary' | 'secondary' | 'danger' | 'ghost'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input(false, { transform: booleanAttribute });
  ariaLabel = input<string>();
  ariaPressed = input<boolean | undefined>();

  clicked = output<Event>();

  type = input<'button' | 'submit' | 'reset'>('button');

  buttonClasses = computed(() => {
    const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
    
    const sizeClasses: Record<string, string> = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-5 py-2.5 text-base gap-2',
    };

    const variantClasses: Record<string, string> = {
      primary: 'bg-indigo-500 text-white hover:bg-indigo-600 focus-visible:ring-indigo-500 shadow-sm',
      secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:ring-gray-400',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500 shadow-sm',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus-visible:ring-gray-400',
    };

    return `${base} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]}`;
  });

  handleClick(event: Event): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}

function booleanAttribute(value: string | boolean): boolean {
  if (typeof value === 'boolean') return value;
  return value !== null && value !== 'false';
}
