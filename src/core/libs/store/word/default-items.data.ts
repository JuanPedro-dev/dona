import type { Item } from './item.model';

/**
 * Raw seed entries. Buttons have `id: null` intentionally – the store
 * will call crypto.randomUUID() before persisting them to IndexedDB.
 */
type RawSeedItem = Omit<Item, 'id'> & { id: string | null };

const RAW_DEFAULT_ITEMS: RawSeedItem[] = [
  // ── Folders (root) ────────────────────────────────────────────────
  {
    id: 'folder-core',
    type: 'folder',
    label: 'Palabras Clave',
    emoji: '🔑',
    backgroundColor: '#fef08a',
    textColor: '#1f2937',
    folderId: null,
    order: 0,
  },
  {
    id: 'folder-feelings',
    type: 'folder',
    label: 'Sentimientos',
    emoji: '😊',
    backgroundColor: '#fbcfe8',
    textColor: '#1f2937',
    folderId: null,
    order: 1,
  },
  {
    id: 'folder-actions',
    type: 'folder',
    label: 'Acciones',
    emoji: '🏃',
    backgroundColor: '#bbf7d0',
    textColor: '#1f2937',
    folderId: null,
    order: 2,
  },
  {
    id: 'folder-food',
    type: 'folder',
    label: 'Comida y Bebida',
    emoji: '🍎',
    backgroundColor: '#fed7aa',
    textColor: '#1f2937',
    folderId: null,
    order: 3,
  },
  {
    id: 'folder-people',
    type: 'folder',
    label: 'Personas',
    emoji: '👨‍👩‍👧',
    backgroundColor: '#ddd6fe',
    textColor: '#1f2937',
    folderId: null,
    order: 4,
  },
  {
    id: 'folder-places',
    type: 'folder',
    label: 'Lugares',
    emoji: '🏠',
    backgroundColor: '#bae6fd',
    textColor: '#1f2937',
    folderId: null,
    order: 5,
  },
  {
    id: 'folder-questions',
    type: 'folder',
    label: 'Preguntas',
    emoji: '❓',
    backgroundColor: '#fde68a',
    textColor: '#1f2937',
    folderId: null,
    order: 6,
  },
  {
    id: 'folder-social',
    type: 'folder',
    label: 'Social',
    emoji: '👋',
    backgroundColor: '#a7f3d0',
    textColor: '#1f2937',
    folderId: null,
    order: 7,
  },

  // ── Core Words ────────────────────────────────────────────────────
  { id: null, type: 'button', label: 'Yo',        emoji: '🙋',  backgroundColor: '#fef08a', textColor: '#1f2937', folderId: 'folder-core', order: 0 },
  { id: null, type: 'button', label: 'Tú',        emoji: '👉',  backgroundColor: '#fef08a', textColor: '#1f2937', folderId: 'folder-core', order: 1 },
  { id: null, type: 'button', label: 'Él',        emoji: '👦',  backgroundColor: '#fef08a', textColor: '#1f2937', folderId: 'folder-core', order: 2 },
  { id: null, type: 'button', label: 'Ella',      emoji: '👧',  backgroundColor: '#fef08a', textColor: '#1f2937', folderId: 'folder-core', order: 3 },
  { id: null, type: 'button', label: 'Esto',      emoji: '👇',  backgroundColor: '#fef08a', textColor: '#1f2937', folderId: 'folder-core', order: 4 },
  { id: null, type: 'button', label: 'Eso',       emoji: '👆',  backgroundColor: '#fef08a', textColor: '#1f2937', folderId: 'folder-core', order: 5 },
  { id: null, type: 'button', label: 'Aquí',      emoji: '📍',  backgroundColor: '#fef08a', textColor: '#1f2937', folderId: 'folder-core', order: 6 },
  { id: null, type: 'button', label: 'Allí',      emoji: '🗺️', backgroundColor: '#fef08a', textColor: '#1f2937', folderId: 'folder-core', order: 7 },
  { id: null, type: 'button', label: 'Más',       emoji: '➕',  backgroundColor: '#fef08a', textColor: '#1f2937', folderId: 'folder-core', order: 8 },
  { id: null, type: 'button', label: 'Terminado', emoji: '🏁',  backgroundColor: '#fef08a', textColor: '#1f2937', folderId: 'folder-core', order: 9 },
  { id: null, type: 'button', label: 'No',        emoji: '🚫',  backgroundColor: '#fef08a', textColor: '#1f2937', folderId: 'folder-core', order: 10 },
  { id: null, type: 'button', label: 'Sí',        emoji: '✅',  backgroundColor: '#fef08a', textColor: '#1f2937', folderId: 'folder-core', order: 11 },

  // ── Feelings ──────────────────────────────────────────────────────
  { id: null, type: 'button', label: 'Feliz',       emoji: '😀', backgroundColor: '#fbcfe8', textColor: '#1f2937', folderId: 'folder-feelings', order: 0 },
  { id: null, type: 'button', label: 'Triste',      emoji: '😢', backgroundColor: '#fbcfe8', textColor: '#1f2937', folderId: 'folder-feelings', order: 1 },
  { id: null, type: 'button', label: 'Enojado',     emoji: '😠', backgroundColor: '#fbcfe8', textColor: '#1f2937', folderId: 'folder-feelings', order: 2 },
  { id: null, type: 'button', label: 'Cansado',     emoji: '🥱', backgroundColor: '#fbcfe8', textColor: '#1f2937', folderId: 'folder-feelings', order: 3 },
  { id: null, type: 'button', label: 'Asustado',    emoji: '😨', backgroundColor: '#fbcfe8', textColor: '#1f2937', folderId: 'folder-feelings', order: 4 },
  { id: null, type: 'button', label: 'Enfermo',     emoji: '🤒', backgroundColor: '#fbcfe8', textColor: '#1f2937', folderId: 'folder-feelings', order: 5 },
  { id: null, type: 'button', label: 'Hambriento',  emoji: '🤤', backgroundColor: '#fbcfe8', textColor: '#1f2937', folderId: 'folder-feelings', order: 6 },
  { id: null, type: 'button', label: 'Sediento',    emoji: '🥤', backgroundColor: '#fbcfe8', textColor: '#1f2937', folderId: 'folder-feelings', order: 7 },
  { id: null, type: 'button', label: 'Sorprendido', emoji: '😲', backgroundColor: '#fbcfe8', textColor: '#1f2937', folderId: 'folder-feelings', order: 8 },
  { id: null, type: 'button', label: 'Aburrido',    emoji: '😑', backgroundColor: '#fbcfe8', textColor: '#1f2937', folderId: 'folder-feelings', order: 9 },

  // ── Actions ───────────────────────────────────────────────────────
  { id: null, type: 'button', label: 'Quiero',  emoji: '🙏',  backgroundColor: '#bbf7d0', textColor: '#1f2937', folderId: 'folder-actions', order: 0 },
  { id: null, type: 'button', label: 'Ir',      emoji: '🚶',  backgroundColor: '#bbf7d0', textColor: '#1f2937', folderId: 'folder-actions', order: 1 },
  { id: null, type: 'button', label: 'Comer',   emoji: '🍽️', backgroundColor: '#bbf7d0', textColor: '#1f2937', folderId: 'folder-actions', order: 2 },
  { id: null, type: 'button', label: 'Beber',   emoji: '🥛',  backgroundColor: '#bbf7d0', textColor: '#1f2937', folderId: 'folder-actions', order: 3 },
  { id: null, type: 'button', label: 'Jugar',   emoji: '🎮',  backgroundColor: '#bbf7d0', textColor: '#1f2937', folderId: 'folder-actions', order: 4 },
  { id: null, type: 'button', label: 'Dormir',  emoji: '😴',  backgroundColor: '#bbf7d0', textColor: '#1f2937', folderId: 'folder-actions', order: 5 },
  { id: null, type: 'button', label: 'Ayudar',  emoji: '🤝',  backgroundColor: '#bbf7d0', textColor: '#1f2937', folderId: 'folder-actions', order: 6 },
  { id: null, type: 'button', label: 'Parar',   emoji: '✋',  backgroundColor: '#bbf7d0', textColor: '#1f2937', folderId: 'folder-actions', order: 7 },
  { id: null, type: 'button', label: 'Mirar',   emoji: '👀',  backgroundColor: '#bbf7d0', textColor: '#1f2937', folderId: 'folder-actions', order: 8 },
  { id: null, type: 'button', label: 'Escuchar',emoji: '👂',  backgroundColor: '#bbf7d0', textColor: '#1f2937', folderId: 'folder-actions', order: 9 },

  // ── Food & Drink ──────────────────────────────────────────────────
  { id: null, type: 'button', label: 'Agua',     emoji: '💧', backgroundColor: '#fed7aa', textColor: '#1f2937', folderId: 'folder-food', order: 0 },
  { id: null, type: 'button', label: 'Leche',    emoji: '🥛', backgroundColor: '#fed7aa', textColor: '#1f2937', folderId: 'folder-food', order: 1 },
  { id: null, type: 'button', label: 'Pan',      emoji: '🍞', backgroundColor: '#fed7aa', textColor: '#1f2937', folderId: 'folder-food', order: 2 },
  { id: null, type: 'button', label: 'Fruta',    emoji: '🍓', backgroundColor: '#fed7aa', textColor: '#1f2937', folderId: 'folder-food', order: 3 },
  { id: null, type: 'button', label: 'Verduras', emoji: '🥦', backgroundColor: '#fed7aa', textColor: '#1f2937', folderId: 'folder-food', order: 4 },
  { id: null, type: 'button', label: 'Pollo',    emoji: '🍗', backgroundColor: '#fed7aa', textColor: '#1f2937', folderId: 'folder-food', order: 5 },
  { id: null, type: 'button', label: 'Arroz',    emoji: '🍚', backgroundColor: '#fed7aa', textColor: '#1f2937', folderId: 'folder-food', order: 6 },
  { id: null, type: 'button', label: 'Jugo',     emoji: '🧃', backgroundColor: '#fed7aa', textColor: '#1f2937', folderId: 'folder-food', order: 7 },

  // ── People ────────────────────────────────────────────────────────
  { id: null, type: 'button', label: 'Mamá',    emoji: '👩', backgroundColor: '#ddd6fe', textColor: '#1f2937', folderId: 'folder-people', order: 0 },
  { id: null, type: 'button', label: 'Papá',    emoji: '👨', backgroundColor: '#ddd6fe', textColor: '#1f2937', folderId: 'folder-people', order: 1 },
  { id: null, type: 'button', label: 'Hermano', emoji: '👦', backgroundColor: '#ddd6fe', textColor: '#1f2937', folderId: 'folder-people', order: 2 },
  { id: null, type: 'button', label: 'Hermana', emoji: '👧', backgroundColor: '#ddd6fe', textColor: '#1f2937', folderId: 'folder-people', order: 3 },
  { id: null, type: 'button', label: 'Amigo',   emoji: '🧑', backgroundColor: '#ddd6fe', textColor: '#1f2937', folderId: 'folder-people', order: 4 },
  { id: null, type: 'button', label: 'Maestro', emoji: '👩‍🏫', backgroundColor: '#ddd6fe', textColor: '#1f2937', folderId: 'folder-people', order: 5 },
  { id: null, type: 'button', label: 'Doctor',  emoji: '👨‍⚕️', backgroundColor: '#ddd6fe', textColor: '#1f2937', folderId: 'folder-people', order: 6 },

  // ── Places ────────────────────────────────────────────────────────
  { id: null, type: 'button', label: 'Casa',     emoji: '🏠', backgroundColor: '#bae6fd', textColor: '#1f2937', folderId: 'folder-places', order: 0 },
  { id: null, type: 'button', label: 'Escuela',  emoji: '🏫', backgroundColor: '#bae6fd', textColor: '#1f2937', folderId: 'folder-places', order: 1 },
  { id: null, type: 'button', label: 'Baño',     emoji: '🚿', backgroundColor: '#bae6fd', textColor: '#1f2937', folderId: 'folder-places', order: 2 },
  { id: null, type: 'button', label: 'Cocina',   emoji: '🍳', backgroundColor: '#bae6fd', textColor: '#1f2937', folderId: 'folder-places', order: 3 },
  { id: null, type: 'button', label: 'Parque',   emoji: '🌳', backgroundColor: '#bae6fd', textColor: '#1f2937', folderId: 'folder-places', order: 4 },
  { id: null, type: 'button', label: 'Hospital', emoji: '🏥', backgroundColor: '#bae6fd', textColor: '#1f2937', folderId: 'folder-places', order: 5 },
  { id: null, type: 'button', label: 'Tienda',   emoji: '🏪', backgroundColor: '#bae6fd', textColor: '#1f2937', folderId: 'folder-places', order: 6 },

  // ── Questions ─────────────────────────────────────────────────────
  { id: null, type: 'button', label: 'Qué',    emoji: '❓', backgroundColor: '#fde68a', textColor: '#1f2937', folderId: 'folder-questions', order: 0 },
  { id: null, type: 'button', label: 'Quién',  emoji: '🧐', backgroundColor: '#fde68a', textColor: '#1f2937', folderId: 'folder-questions', order: 1 },
  { id: null, type: 'button', label: 'Dónde',  emoji: '🗺️', backgroundColor: '#fde68a', textColor: '#1f2937', folderId: 'folder-questions', order: 2 },
  { id: null, type: 'button', label: 'Cuándo', emoji: '🕐', backgroundColor: '#fde68a', textColor: '#1f2937', folderId: 'folder-questions', order: 3 },
  { id: null, type: 'button', label: 'Por qué',emoji: '🤔', backgroundColor: '#fde68a', textColor: '#1f2937', folderId: 'folder-questions', order: 4 },
  { id: null, type: 'button', label: 'Cómo',   emoji: '💡', backgroundColor: '#fde68a', textColor: '#1f2937', folderId: 'folder-questions', order: 5 },
  { id: null, type: 'button', label: 'Cuánto', emoji: '🔢', backgroundColor: '#fde68a', textColor: '#1f2937', folderId: 'folder-questions', order: 6 },

  // ── Social ────────────────────────────────────────────────────────
  { id: null, type: 'button', label: 'Hola',       emoji: '👋',  backgroundColor: '#a7f3d0', textColor: '#1f2937', folderId: 'folder-social', order: 0 },
  { id: null, type: 'button', label: 'Adiós',      emoji: '🙋',  backgroundColor: '#a7f3d0', textColor: '#1f2937', folderId: 'folder-social', order: 1 },
  { id: null, type: 'button', label: 'Gracias',    emoji: '🙏',  backgroundColor: '#a7f3d0', textColor: '#1f2937', folderId: 'folder-social', order: 2 },
  { id: null, type: 'button', label: 'Por favor',  emoji: '😇',  backgroundColor: '#a7f3d0', textColor: '#1f2937', folderId: 'folder-social', order: 3 },
  { id: null, type: 'button', label: 'Perdón',     emoji: '😔',  backgroundColor: '#a7f3d0', textColor: '#1f2937', folderId: 'folder-social', order: 4 },
  { id: null, type: 'button', label: 'Ayuda',      emoji: '🆘',  backgroundColor: '#a7f3d0', textColor: '#1f2937', folderId: 'folder-social', order: 5 },
  { id: null, type: 'button', label: 'Bien',       emoji: '👍',  backgroundColor: '#a7f3d0', textColor: '#1f2937', folderId: 'folder-social', order: 6 },
  { id: null, type: 'button', label: 'No sé',      emoji: '🤷',  backgroundColor: '#a7f3d0', textColor: '#1f2937', folderId: 'folder-social', order: 7 },
];

/**
 * Produces the full default dataset with all IDs resolved.
 * Folders keep their deterministic id; buttons get a fresh UUID each call.
 */
export function buildDefaultItems(): Item[] {
  return RAW_DEFAULT_ITEMS.map((raw) => ({
    ...raw,
    id: raw.id ?? crypto.randomUUID(),
  }));
}
