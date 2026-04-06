import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService, ToastType } from '@services/toast.service';

@Component({
  selector: 'app-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-live': 'assertive',
    'aria-atomic': 'true',
    class: 'fixed top-6 right-6 z-[3000] pointer-events-none flex flex-col gap-3 w-full max-w-[320px]',
  },
  template: `
    @for (toast of toastService.toasts(); track toast.id) {
      <div
        class="toast-item pointer-events-auto relative flex items-start gap-3.5 p-4 rounded-xl shadow-lg transition-all w-full overflow-hidden text-white"
        [class]="getToastClasses(toast.type)"
        role="status">
        
        @if (toast.icon) {
          <span class="shrink-0 text-xl leading-none mt-0.5">{{ toast.icon }}</span>
        }

        <div class="flex-1 min-w-0">
          @if (toast.title) {
            <h4 class="font-extrabold text-sm tracking-tight mb-0.5 leading-none">{{ toast.title }}</h4>
          }
          <p class="text-[0.85rem] leading-snug font-medium opacity-90">{{ toast.message }}</p>
        </div>

        <button
          type="button"
          class="shrink-0 opacity-60 hover:opacity-100 focus:opacity-100 transition-opacity p-1 -mr-1 outline-none text-white text-xs font-bold"
          aria-label="Cerrar notificación"
          (click)="toastService.dismiss(toast.id)">
          ✕
        </button>

        <!-- Solid Progress Bar -->
        <div class="absolute bottom-0 left-0 w-full h-1 bg-black/10">
          <div 
            class="h-full bg-white transition-all ease-linear"
            [style.width.%]="0"
            [style.animation]="'progress ' + toast.duration + 'ms linear forwards'">
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }

    .toast-item {
      animation: toast-in 0.35s cubic-bezier(0.23, 1, 0.32, 1);
    }

    @keyframes toast-in {
      from {
        transform: translateX(100px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes progress {
       from { width: 100%; }
       to { width: 0%; }
    }

    .toast-success {
      background-color: #10b981;
    }

    .toast-error {
      background-color: #ef4444;
    }

    .toast-info {
      background-color: #3b82f6;
    }

    .toast-warning {
      background-color: #f59e0b;
    }
  `,
  imports: [],
})
export class Toast {
  readonly toastService = inject(ToastService);

  protected getToastClasses(type: ToastType): string {
    return `toast-${type}`;
  }
}
