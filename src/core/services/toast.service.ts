import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number; // ms
  icon?: string;
  title?: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(message: string, type: ToastType = 'info', duration = 3000, title?: string, icon?: string): void {
    const toast: Toast = {
      id: crypto.randomUUID(),
      message,
      type,
      duration,
      title: title ?? this._getDefaultTitle(type),
      icon: icon ?? this._getDefaultIcon(type),
    };

    this._toasts.update(list => [...list, toast]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(toast.id), duration);
    }
  }

  dismiss(id: string): void {
    this._toasts.update(list => list.filter(t => t.id !== id));
  }

  clear(): void {
    this._toasts.set([]);
  }

  // Convenience methods
  success(message: string, options?: { duration?: number; title?: string; icon?: string }) {
    this.show(message, 'success', options?.duration, options?.title, options?.icon);
  }

  error(message: string, options?: { duration?: number; title?: string; icon?: string }) {
    this.show(message, 'error', options?.duration ?? 5000, options?.title, options?.icon);
  }

  info(message: string, options?: { duration?: number; title?: string; icon?: string }) {
    this.show(message, 'info', options?.duration, options?.title, options?.icon);
  }

  warning(message: string, options?: { duration?: number; title?: string; icon?: string }) {
    this.show(message, 'warning', options?.duration, options?.title, options?.icon);
  }

  private _getDefaultTitle(type: ToastType): string {
    switch (type) {
      case 'success': return 'Completado';
      case 'error': return 'Error';
      case 'warning': return 'Atención';
      case 'info':
      default: return 'Información';
    }
  }

  private _getDefaultIcon(type: ToastType): string {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info':
      default: return 'ℹ️';
    }
  }
}