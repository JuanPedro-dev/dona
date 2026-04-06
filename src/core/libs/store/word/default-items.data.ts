import type { Item } from './item.model';

/**
 * Raw seed entries. Buttons have `id: null` intentionally – the store
 * will call crypto.randomUUID() before persisting them to IndexedDB.
 */
type RawSeedItem = Omit<Item, 'id'> & { id: string | null };

const RAW_DEFAULT_ITEMS: RawSeedItem[] = [
  // Categories (MUY distintivas)
  {
    id: 'folder-core',
    type: 'folder',
    label: 'Palabras Clave',
    emoji: '🔑',
    backgroundColor: '#2563eb', // azul fuerte
    textColor: '#ffffff',
    folderId: null,
    order: 0,
  },
  {
    id: 'folder-feelings',
    type: 'folder',
    label: 'Sentimientos',
    emoji: '😊',
    backgroundColor: '#dc2626', // rojo emocional
    textColor: '#ffffff',
    folderId: null,
    order: 1,
  },
  {
    id: 'folder-actions',
    type: 'folder',
    label: 'Acciones',
    emoji: '🏃',
    backgroundColor: '#7c3aed', // violeta (acción/dinámico)
    textColor: '#ffffff',
    folderId: null,
    order: 2,
  },
  {
    id: 'folder-food',
    type: 'folder',
    label: 'Comida y Bebida',
    emoji: '🍎',
    backgroundColor: '#16a34a', // verde comida
    textColor: '#ffffff',
    folderId: null,
    order: 3,
  },
  {
    id: 'folder-people',
    type: 'folder',
    label: 'Personas',
    emoji: '👥',
    backgroundColor: '#ea580c', // naranja cálido
    textColor: '#ffffff',
    folderId: null,
    order: 4,
  },
  {
    id: 'folder-places',
    type: 'folder',
    label: 'Lugares',
    emoji: '🏠',
    backgroundColor: '#0891b2', // cyan (espacio)
    textColor: '#ffffff',
    folderId: null,
    order: 5,
  },
  {
    id: 'folder-questions',
    type: 'folder',
    label: 'Preguntas',
    emoji: '❓',
    backgroundColor: '#ca8a04', // amarillo oscuro accesible
    textColor: '#ffffff',
    folderId: null,
    order: 6,
  },
  {
    id: 'folder-social',
    type: 'folder',
    label: 'Social',
    emoji: '💬',
    backgroundColor: '#db2777', // rosa social
    textColor: '#ffffff',
    folderId: null,
    order: 7,
  },

  // 🔵 CORE (variaciones del azul para consistencia cognitiva)
  { id: null, type: 'button', label: 'Yo', emoji: '🙋', backgroundColor: '#3b82f6', textColor: '#ffffff', folderId: 'folder-core', order: 0 },
  { id: null, type: 'button', label: 'Tú', emoji: '👉', backgroundColor: '#2563eb', textColor: '#ffffff', folderId: 'folder-core', order: 1 },
  { id: null, type: 'button', label: 'Él', emoji: '👦', backgroundColor: '#1d4ed8', textColor: '#ffffff', folderId: 'folder-core', order: 2 },
  { id: null, type: 'button', label: 'Ella', emoji: '👧', backgroundColor: '#60a5fa', textColor: '#111827', folderId: 'folder-core', order: 3 },
  { id: null, type: 'button', label: 'Esto', emoji: '👇', backgroundColor: '#93c5fd', textColor: '#111827', folderId: 'folder-core', order: 4 },
  { id: null, type: 'button', label: 'Eso', emoji: '👆', backgroundColor: '#1e40af', textColor: '#ffffff', folderId: 'folder-core', order: 5 },
  { id: null, type: 'button', label: 'Aquí', emoji: '📍', backgroundColor: '#2563eb', textColor: '#ffffff', folderId: 'folder-core', order: 6 },
  { id: null, type: 'button', label: 'Allí', emoji: '🗺️', backgroundColor: '#1d4ed8', textColor: '#ffffff', folderId: 'folder-core', order: 7 },

  // 🔴 FEELINGS (rojos + variaciones)
  { id: null, type: 'button', label: 'Feliz', emoji: '😀', backgroundColor: '#f97316', textColor: '#ffffff', folderId: 'folder-feelings', order: 0 },
  { id: null, type: 'button', label: 'Triste', emoji: '😢', backgroundColor: '#1d4ed8', textColor: '#ffffff', folderId: 'folder-feelings', order: 1 },
  { id: null, type: 'button', label: 'Enojado', emoji: '😠', backgroundColor: '#b91c1c', textColor: '#ffffff', folderId: 'folder-feelings', order: 2 },
  { id: null, type: 'button', label: 'Cansado', emoji: '🥱', backgroundColor: '#6b7280', textColor: '#ffffff', folderId: 'folder-feelings', order: 3 },
  { id: null, type: 'button', label: 'Asustado', emoji: '😨', backgroundColor: '#7c3aed', textColor: '#ffffff', folderId: 'folder-feelings', order: 4 },
  { id: null, type: 'button', label: 'Enfermo', emoji: '🤒', backgroundColor: '#059669', textColor: '#ffffff', folderId: 'folder-feelings', order: 5 },
  { id: null, type: 'button', label: 'Hambriento', emoji: '🤤', backgroundColor: '#d97706', textColor: '#ffffff', folderId: 'folder-feelings', order: 6 },
  { id: null, type: 'button', label: 'Sediento', emoji: '🥤', backgroundColor: '#0284c7', textColor: '#ffffff', folderId: 'folder-feelings', order: 7 },

  // 🟣 ACTIONS (violetas consistentes)
  { id: null, type: 'button', label: 'Ir', emoji: '🚶', backgroundColor: '#8b5cf6', textColor: '#ffffff', folderId: 'folder-actions', order: 0 },
  { id: null, type: 'button', label: 'Parar', emoji: '🛑', backgroundColor: '#dc2626', textColor: '#ffffff', folderId: 'folder-actions', order: 1 },
  { id: null, type: 'button', label: 'Querer', emoji: '🤲', backgroundColor: '#7c3aed', textColor: '#ffffff', folderId: 'folder-actions', order: 2 },
  { id: null, type: 'button', label: 'Tener', emoji: '👐', backgroundColor: '#6d28d9', textColor: '#ffffff', folderId: 'folder-actions', order: 3 },
  { id: null, type: 'button', label: 'Mirar', emoji: '👀', backgroundColor: '#4c1d95', textColor: '#ffffff', folderId: 'folder-actions', order: 4 },
  { id: null, type: 'button', label: 'Jugar', emoji: '🎮', backgroundColor: '#9333ea', textColor: '#ffffff', folderId: 'folder-actions', order: 5 },
  { id: null, type: 'button', label: 'Comer', emoji: '🍽️', backgroundColor: '#ea580c', textColor: '#ffffff', folderId: 'folder-actions', order: 6 },
  { id: null, type: 'button', label: 'Beber', emoji: '🥛', backgroundColor: '#0284c7', textColor: '#ffffff', folderId: 'folder-actions', order: 7 },
  { id: null, type: 'button', label: 'Dormir', emoji: '🛌', backgroundColor: '#1e293b', textColor: '#ffffff', folderId: 'folder-actions', order: 8 },
  { id: null, type: 'button', label: 'Gustar', emoji: '👍', backgroundColor: '#c026d3', textColor: '#ffffff', folderId: 'folder-actions', order: 9 },

  // 🟢 FOOD (verdes + cálidos)
  { id: null, type: 'button', label: 'Agua', emoji: '💧', backgroundColor: '#0284c7', textColor: '#ffffff', folderId: 'folder-food', order: 0 },
  { id: null, type: 'button', label: 'Jugo', emoji: '🧃', backgroundColor: '#f97316', textColor: '#ffffff', folderId: 'folder-food', order: 1 },
  { id: null, type: 'button', label: 'Leche', emoji: '🥛', backgroundColor: '#e5e7eb', textColor: '#111827', folderId: 'folder-food', order: 2 },
  { id: null, type: 'button', label: 'Manzana', emoji: '🍎', backgroundColor: '#dc2626', textColor: '#ffffff', folderId: 'folder-food', order: 3 },
  { id: null, type: 'button', label: 'Plátano', emoji: '🍌', backgroundColor: '#eab308', textColor: '#111827', folderId: 'folder-food', order: 4 },
  { id: null, type: 'button', label: 'Galleta', emoji: '🍪', backgroundColor: '#92400e', textColor: '#ffffff', folderId: 'folder-food', order: 5 },
  { id: null, type: 'button', label: 'Pan', emoji: '🍞', backgroundColor: '#d97706', textColor: '#ffffff', folderId: 'folder-food', order: 6 },
  { id: null, type: 'button', label: 'Carne', emoji: '🥩', backgroundColor: '#7f1d1d', textColor: '#ffffff', folderId: 'folder-food', order: 7 },

    // 🟠 PEOPLE
  { id: null, type: 'button', label: 'Mamá', emoji: '👩', backgroundColor: '#f97316', textColor: '#ffffff', folderId: 'folder-people', order: 0 },
  { id: null, type: 'button', label: 'Papá', emoji: '👨', backgroundColor: '#ea580c', textColor: '#ffffff', folderId: 'folder-people', order: 1 },
  { id: null, type: 'button', label: 'Hermano', emoji: '👦', backgroundColor: '#c2410c', textColor: '#ffffff', folderId: 'folder-people', order: 2 },
  { id: null, type: 'button', label: 'Hermana', emoji: '👧', backgroundColor: '#fb923c', textColor: '#111827', folderId: 'folder-people', order: 3 },
  { id: null, type: 'button', label: 'Abuela', emoji: '👵', backgroundColor: '#fdba74', textColor: '#111827', folderId: 'folder-people', order: 4 },
  { id: null, type: 'button', label: 'Abuelo', emoji: '👴', backgroundColor: '#9a3412', textColor: '#ffffff', folderId: 'folder-people', order: 5 },
  { id: null, type: 'button', label: 'Amigo', emoji: '🧑‍🤝‍🧑', backgroundColor: '#f59e0b', textColor: '#111827', folderId: 'folder-people', order: 6 },
  { id: null, type: 'button', label: 'Maestro', emoji: '👨‍🏫', backgroundColor: '#b45309', textColor: '#ffffff', folderId: 'folder-people', order: 7 },

    // 🔵 PLACES
  { id: null, type: 'button', label: 'Casa', emoji: '🏠', backgroundColor: '#0891b2', textColor: '#ffffff', folderId: 'folder-places', order: 0 },
  { id: null, type: 'button', label: 'Escuela', emoji: '🏫', backgroundColor: '#0284c7', textColor: '#ffffff', folderId: 'folder-places', order: 1 },
  { id: null, type: 'button', label: 'Parque', emoji: '🏞️', backgroundColor: '#059669', textColor: '#ffffff', folderId: 'folder-places', order: 2 },
  { id: null, type: 'button', label: 'Tienda', emoji: '🏪', backgroundColor: '#0ea5e9', textColor: '#ffffff', folderId: 'folder-places', order: 3 },
  { id: null, type: 'button', label: 'Baño', emoji: '🚽', backgroundColor: '#1d4ed8', textColor: '#ffffff', folderId: 'folder-places', order: 4 },
  { id: null, type: 'button', label: 'Cama', emoji: '🛏️', backgroundColor: '#334155', textColor: '#ffffff', folderId: 'folder-places', order: 5 },
  { id: null, type: 'button', label: 'Afuera', emoji: '🌳', backgroundColor: '#16a34a', textColor: '#ffffff', folderId: 'folder-places', order: 6 },
  { id: null, type: 'button', label: 'Adentro', emoji: '🛋️', backgroundColor: '#0f172a', textColor: '#ffffff', folderId: 'folder-places', order: 7 },

    // 🟡 QUESTIONS
  { id: null, type: 'button', label: 'Qué', emoji: '🤷', backgroundColor: '#eab308', textColor: '#111827', folderId: 'folder-questions', order: 0 },
  { id: null, type: 'button', label: 'Quién', emoji: '👤', backgroundColor: '#ca8a04', textColor: '#ffffff', folderId: 'folder-questions', order: 1 },
  { id: null, type: 'button', label: 'Dónde', emoji: '🔍', backgroundColor: '#a16207', textColor: '#ffffff', folderId: 'folder-questions', order: 2 },
  { id: null, type: 'button', label: 'Cuándo', emoji: '⏰', backgroundColor: '#facc15', textColor: '#111827', folderId: 'folder-questions', order: 3 },
  { id: null, type: 'button', label: 'Por qué', emoji: '🤔', backgroundColor: '#854d0e', textColor: '#ffffff', folderId: 'folder-questions', order: 4 },
  { id: null, type: 'button', label: 'Cómo', emoji: '🛠️', backgroundColor: '#fde047', textColor: '#111827', folderId: 'folder-questions', order: 5 },


    // 🌸 SOCIAL
  { id: null, type: 'button', label: 'Por favor', emoji: '🙏', backgroundColor: '#ec4899', textColor: '#ffffff', folderId: 'folder-social', order: 0 },
  { id: null, type: 'button', label: 'Gracias', emoji: '💖', backgroundColor: '#db2777', textColor: '#ffffff', folderId: 'folder-social', order: 1 },
  { id: null, type: 'button', label: 'De nada', emoji: '😊', backgroundColor: '#f472b6', textColor: '#111827', folderId: 'folder-social', order: 2 },
  { id: null, type: 'button', label: 'Perdón', emoji: '😔', backgroundColor: '#be185d', textColor: '#ffffff', folderId: 'folder-social', order: 3 },
  { id: null, type: 'button', label: 'Te amo', emoji: '❤️', backgroundColor: '#9d174d', textColor: '#ffffff', folderId: 'folder-social', order: 4 },
  { id: null, type: 'button', label: 'Adiós', emoji: '👋', backgroundColor: '#f9a8d4', textColor: '#111827', folderId: 'folder-social', order: 5 },
  { id: null, type: 'button', label: 'Bien', emoji: '👍', backgroundColor: '#ec4899', textColor: '#ffffff', folderId: 'folder-social', order: 6 },
  { id: null, type: 'button', label: 'Mal', emoji: '👎', backgroundColor: '#9f1239', textColor: '#ffffff', folderId: 'folder-social', order: 7 },
];
/**
 * Produces the full default dataset with all IDs resolved.
 * Folders keep their deterministic id; buttons get a fresh UUID each call.
 */
export function buildDefaultItems(): Item[] {
  return RAW_DEFAULT_ITEMS.map(raw => ({
    ...raw,
    id: raw.id ?? crypto.randomUUID(),
  }));
}
