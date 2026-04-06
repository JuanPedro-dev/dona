import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '@components/navbar';

@Component({
  selector: 'app-not-found',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, RouterLink],
  template: `
    <div class="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <app-navbar />

      <main class="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div class="space-y-8 animate-in fade-in zoom-in duration-500">
          <!-- Icon/Emoji -->
          <div class="relative inline-block">
            <span class="text-8xl md:text-9xl drop-shadow-xl select-none">🧭</span>
            <div
              class="absolute -top-4 -right-4 bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-black shadow-lg animate-bounce">
              404
            </div>
          </div>

          <!-- Message -->
          <div class="space-y-3">
            <h2 class="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              ¡Uy! Te has perdido
            </h2>
            <p class="text-gray-500 text-lg max-w-sm mx-auto leading-relaxed">
              No pudimos encontrar la página que buscas. Tal vez el mapa te llevó por el camino
              equivocado.
            </p>
          </div>

          <!-- Actions -->
          <div class="pt-4">
            <button
              routerLink="/"
              class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-100 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3 mx-auto">
              <span>🏠</span>
              <span>Volver al Inicio</span>
            </button>
          </div>
        </div>
      </main>

      <!-- Decorative pattern -->
      <div
        class="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20"></div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class NotFound {}
