import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Navbar } from '@components/navbar';
import { SentenceBar } from '@components/sentence-bar';
import { CategoryTabs } from '@components/category-tabs';
import { GridButtons } from '@components/grid-buttons';
import { LayoutService } from '@services/layout.service';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, SentenceBar, CategoryTabs, GridButtons],
  template: ` <div class="h-screen flex flex-col bg-gray-50 overflow-hidden">
    <app-navbar></app-navbar>

    <main class="flex-1 overflow-auto">
      @if (layoutService.showSentenceBar()) {
        <app-sentence-bar />
      }
      <app-category-tabs />
      <app-grid-buttons />
    </main>
  </div>`,
})
export class HomePage {
  protected readonly layoutService = inject(LayoutService);
}
