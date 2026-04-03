import { signalStore, withState } from '@ngrx/signals';
import { inject, InjectionToken } from '@angular/core';

// import { Word } from './word.model';

type WordSearchState = {
  words: any[];
  isLoading: boolean;
  wordAdded: boolean;
  wordDeleted: boolean;
  wordUpdated: boolean;
};

const initialState: WordSearchState = {
  words: [],
  isLoading: false,
  wordAdded: false,
  wordDeleted: false,
  wordUpdated: false,
};

const WORD_SEARCH_STATE = new InjectionToken<WordSearchState>('WordSearchState', {
  factory: () => initialState,
});

const WordStore = signalStore({ providedIn: 'root' }, withState(initialState));
