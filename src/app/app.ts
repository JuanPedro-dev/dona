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

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, SentenceBar, CategoryTabs],
  template: `
    <div class="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <app-navbar></app-navbar>

      <main class="flex-1 overflow-auto">
        <app-sentence-bar />

        <app-category-tabs />

        <div class="px-4 py-2 grow">
          <h2 class="text-lg font-bold px-4 py-2">Current Sentence:</h2>
        </div>
        <!-- Demo buttons to add words -->
        <div class="p-4 flex flex-wrap gap-2">
          <span class="text-sm text-gray-500 w-full mb-2">Demo: Tap to add words</span>
          @for (word of demoWords; track word) {
            <button
              (click)="addWord(word)"
              class="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors active:scale-95">
              {{ word }}
            </button>
          }
        </div>
      </main>
    </div>

    <h1>items: {{ initial().length }}</h1>
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

  list = effect(() => {
    console.log('Current items in store:', this.initial());
  });

  onSentenceChange(newSentence: string[]): void {
    this.sentence.set(newSentence);
  }

  addWord(word: string): void {
    this.sentence.update(s => [...s, word]);
  }
}
