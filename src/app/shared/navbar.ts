import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  template: `
    <header
      class="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 flex items-center justify-between shadow-lg">
      <div class="flex items-center gap-2.5">
        <span class="text-2xl">💬</span>
        <div>
          <h1 class="text-lg font-extrabold tracking-tight leading-none">SpeakBoard</h1>
          <p class="text-[10px] text-indigo-200 font-medium">AAC Communication</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        @if (isEditMode()) {
          <span
            class="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
            EDIT MODE
          </span>
        }
        <button
          (click)="setIsSettingsOpen()"
          class="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl transition-all active:scale-90"
          title="Settings">
          ⚙️
        </button>
      </div>
    </header>
  `,
  styles: ``,
})
export class Navbar {
  isEditMode = signal(false);

  setIsSettingsOpen() {
    // Open Modal with options to edit the app, such as changing the theme, managing buttons, etc.
  }
}
