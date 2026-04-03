import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

import { ItemsStore } from '@store/word/items.store';
import { Navbar } from '@components/navbar';
import { SentenceBar } from '@components/sentence-bar';
import { CategoryTabs } from '@components/category-tabs';
import { GridButtons } from '@components/grid-buttons';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, SentenceBar, CategoryTabs, GridButtons],
  template: `
    <div class="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <app-navbar></app-navbar>

      <main class="flex-1 overflow-auto">
        <app-sentence-bar />
        <app-category-tabs />
        <app-grid-buttons />
      </main>
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
  protected readonly title = signal('Dona App');
  wordStore = inject(ItemsStore);
  sentence = signal<string[]>([]);

  demoWords = ['I', 'want', 'water', 'please', 'thank', 'you', 'help', 'more'];
  initial = computed(() => this.wordStore.items());

  onSentenceChange(newSentence: string[]): void {
    this.sentence.set(newSentence);
  }

  addWord(word: string): void {
    this.sentence.update(s => [...s, word]);
  }
}
