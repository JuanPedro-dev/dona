import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { ItemsStore } from '@store/word/items.store';
import { Navbar } from '@components/navbar';
import { SentenceBar } from '@components/sentence-bar';
import { CategoryTabs } from '@components/category-tabs';
import { GridButtons } from '@components/grid-buttons';
import { Config } from './components/config/config';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, SentenceBar, CategoryTabs, GridButtons, Config],
  template: `
    <div class="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <app-navbar (settingsOpen)="isConfigOpen.set(true)"></app-navbar>

      <main class="flex-1 overflow-auto">
        <app-sentence-bar />
        <app-category-tabs />
        <app-grid-buttons />
      </main>

      <app-config-panel [isOpen]="isConfigOpen()" (close)="isConfigOpen.set(false)" />
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `,
})
export class App {
  wordStore = inject(ItemsStore);
  isConfigOpen = signal(false);


}
