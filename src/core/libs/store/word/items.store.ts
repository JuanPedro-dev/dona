import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { IndexedDbService } from '@services/indexed-db.service';
import { buildDefaultItems } from './default-items.data';
import type {
  CreateItemPayload,
  Item,
  UpdateItemPayload,
} from './item.model';

// ── State interface ───────────────────────────────────────────────────────────

interface ItemsState {
  /** Full flat list of all items (folders + buttons) */
  items: Item[];

  /** Which folder the user navigated into (null = home/root) */
  selectedFolderId: string | null;

  /** Async flags */
  isLoading: boolean;
  error: string | null;

  /** Operation result flags – set to true momentarily after each mutation.
   *  Call clearMutationFlags() to reset them once consumed by the UI. */
  wordAdded: boolean;
  wordDeleted: boolean;
  wordUpdated: boolean;
}

const initialState: ItemsState = {
  items: [],
  selectedFolderId: null,
  isLoading: false,
  error: null,
  wordAdded: false,
  wordDeleted: false,
  wordUpdated: false,
};

// ── Store ─────────────────────────────────────────────────────────────────────

export const ItemsStore = signalStore(
  { providedIn: 'root' },

  withState<ItemsState>(initialState),

  // ── Computed ────────────────────────────────────────────────────────────────

  withComputed(({ items, selectedFolderId }) => ({
    /** All folder items at root level, sorted by order */
    rootFolders: computed(() =>
      items()
        .filter((i) => i.type === 'folder' && i.folderId === null)
        .sort((a, b) => a.order - b.order),
    ),

    /** All button items at root level (quick-phrase buttons), sorted by order */
    rootButtons: computed(() =>
      items()
        .filter((i) => i.type === 'button' && i.folderId === null)
        .sort((a, b) => a.order - b.order),
    ),

    /** Items that belong to the currently selected folder, sorted by order */
    currentFolderItems: computed(() => {
      const folderId = selectedFolderId();
      if (folderId === null) return [];
      return items()
        .filter((i) => i.folderId === folderId)
        .sort((a, b) => a.order - b.order);
    }),

    /** Metadata of the currently selected folder (or null when at home) */
    currentFolder: computed(() => {
      const folderId = selectedFolderId();
      if (folderId === null) return null;
      return items().find((i) => i.id === folderId && i.type === 'folder') ?? null;
    }),

    /** Whether the store has been populated at all */
    isEmpty: computed(() => items().length === 0),

    /** Total number of button-type items */
    totalWords: computed(() => items().filter((i) => i.type === 'button').length),

    /** Total number of folder-type items */
    totalFolders: computed(() => items().filter((i) => i.type === 'folder').length),

    /** Lookup map for O(1) access by id */
    itemMap: computed(() => {
      const map = new Map<string, Item>();
      for (const item of items()) {
        map.set(item.id, item);
      }
      return map;
    }),
  })),

  // ── Methods ─────────────────────────────────────────────────────────────────

  withMethods((store) => {
    const db = inject(IndexedDbService);

    // ── helpers ──────────────────────────────────────────────────────

    function setError(error: unknown): void {
      const message =
        error instanceof Error ? error.message : 'Error desconocido';
      patchState(store, { error: message, isLoading: false });
    }

    // ── public API ───────────────────────────────────────────────────

    return {
      // Navigation
      // ─────────────────────────────────────────────────────────────

      /** Navigate into a folder */
      selectFolder(folderId: string): void {
        patchState(store, { selectedFolderId: folderId });
      },

      /** Go back to the home/root screen */
      goHome(): void {
        patchState(store, { selectedFolderId: null });
      },

      // Data lifecycle
      // ─────────────────────────────────────────────────────────────

      /**
       * Loads all items from IndexedDB.
       * If the database is empty, seeds it with the default dataset.
       */
      async loadItems(): Promise<void> {
        patchState(store, { isLoading: true, error: null });

        try {
          const count = await db.count();

          if (count === 0) {
            const defaults = buildDefaultItems();
            await db.bulkPut(defaults);
            patchState(store, { items: defaults, isLoading: false });
          } else {
            const items = await db.getAll();
            patchState(store, { items, isLoading: false });
          }
        } catch (error) {
          setError(error);
        }
      },

      /**
       * Resets the entire database to the default dataset.
       * Use with caution – all custom items are lost.
       */
      async resetToDefaults(): Promise<void> {
        patchState(store, { isLoading: true, error: null });

        try {
          await db.clear();
          const defaults = buildDefaultItems();
          await db.bulkPut(defaults);
          patchState(store, {
            items: defaults,
            isLoading: false,
            selectedFolderId: null,
          });
        } catch (error) {
          setError(error);
        }
      },

      // CRUD
      // ─────────────────────────────────────────────────────────────

      /** Adds a new item (folder or button). Id is auto-generated. */
      async addItem(payload: CreateItemPayload): Promise<void> {
        patchState(store, { error: null, wordAdded: false });

        const newItem: Item = { ...payload, id: crypto.randomUUID() };

        try {
          await db.add(newItem);
          patchState(store, {
            items: [...store.items(), newItem],
            wordAdded: true,
          });
        } catch (error) {
          setError(error);
        }
      },

      /** Updates an existing item by id. Only provided fields are changed. */
      async updateItem(payload: UpdateItemPayload): Promise<void> {
        patchState(store, { error: null, wordUpdated: false });

        const existing = store.itemMap().get(payload.id);
        if (!existing) {
          patchState(store, { error: `Item ${payload.id} no encontrado` });
          return;
        }

        const updated: Item = { ...existing, ...payload };

        try {
          await db.put(updated);
          patchState(store, {
            items: store.items().map((i) => (i.id === updated.id ? updated : i)),
            wordUpdated: true,
          });
        } catch (error) {
          setError(error);
        }
      },

      /**
       * Deletes an item by id.
       * If the item is a folder, also deletes all its children.
       */
      async deleteItem(id: string): Promise<void> {
        patchState(store, { error: null, wordDeleted: false });

        const target = store.itemMap().get(id);
        if (!target) {
          patchState(store, { error: `Item ${id} no encontrado` });
          return;
        }

        // Collect ids to delete
        const idsToDelete: string[] = [id];
        if (target.type === 'folder') {
          const children = store
            .items()
            .filter((i) => i.folderId === id)
            .map((i) => i.id);
          idsToDelete.push(...children);
        }

        try {
          await db.bulkDelete(idsToDelete);

          const deletedSet = new Set(idsToDelete);
          patchState(store, {
            items: store.items().filter((i) => !deletedSet.has(i.id)),
            wordDeleted: true,
            // If we deleted the currently open folder, go home
            selectedFolderId:
              store.selectedFolderId() === id
                ? null
                : store.selectedFolderId(),
          });
        } catch (error) {
          setError(error);
        }
      },

      /**
       * Reorders a list of items within the same folder by updating each
       * item's `order` field to match the provided id array index.
       */
      async reorderItems(orderedIds: string[]): Promise<void> {
        patchState(store, { error: null });

        const reordered: Item[] = orderedIds.reduce<Item[]>((acc, id, index) => {
          const item = store.itemMap().get(id);
          if (item) acc.push({ ...item, order: index });
          return acc;
        }, []);

        try {
          await db.bulkPut(reordered);

          const reorderedMap = new Map(reordered.map((i) => [i.id, i]));
          patchState(store, {
            items: store
              .items()
              .map((i) => reorderedMap.get(i.id) ?? i),
          });
        } catch (error) {
          setError(error);
        }
      },

      // Utility
      // ─────────────────────────────────────────────────────────────

      /**
       * Resets all mutation flags (wordAdded, wordDeleted, wordUpdated).
       * Call this after the UI has consumed the flag (e.g. shown a toast).
       */
      clearMutationFlags(): void {
        patchState(store, {
          wordAdded: false,
          wordDeleted: false,
          wordUpdated: false,
        });
      },

      /** Clears any stored error message. */
      clearError(): void {
        patchState(store, { error: null });
      },
    };
  }),

  // ── Hooks ────────────────────────────────────────────────────────────────────

  withHooks({
    onInit(store) {
      store.loadItems();
    },
  }),
);
