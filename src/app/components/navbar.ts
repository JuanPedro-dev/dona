import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutService } from '@services/layout.service';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <header
      class="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 flex items-center justify-between shadow-lg">
      <div class="flex items-center gap-2.5" routerLink="/">
        <span class="text-2xl">💬</span>
        <div>
          <h1 class="text-lg font-extrabold tracking-tight leading-none">Habla Conmigo</h1>
          <p class="text-[10px] text-indigo-200 font-medium">AAC Comunicación</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        @if (isEditMode()) {
          <span
          (click)="disableEditMode()" 
            class="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
            SALIR DEL MODO EDITAR
          </span>
        }
        <button
          routerLink="/config"
          class="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl transition-all active:scale-95"
          title="Settings">
          ⚙️
        </button>
      </div>
    </header>
  `,
  styles: ``,
})
export class Navbar {
  private readonly layoutService = inject(LayoutService);
  isEditMode = this.layoutService.isEditMode;

  disableEditMode() {
    this.layoutService.toggleEditMode();
  }
}
