import type { TypewriterModel } from '#shared/types/typewriterModels'

// Reference list of real period typewriter models, used to let users pick
// charPitch/keysNumber by model instead of setting the two dials directly.
export const TYPEWRITER_MODELS: TypewriterModel[] = [
  { manufacturer: 'Olivetti', model: 'Lettera 22', keys: 44, pitch: 'pica' },
  { manufacturer: 'Olivetti', model: 'Lettera 32', keys: 44, pitch: 'pica' },
  { manufacturer: 'Olivetti', model: 'Studio 44', keys: 46, pitch: 'pica' },
  { manufacturer: 'Olivetti', model: 'Valentine', keys: 44, pitch: 'pica' },
  { manufacturer: 'Royal', model: 'Quiet De Luxe', keys: 42, pitch: 'pica' },
  { manufacturer: 'Royal', model: 'Aristocrat', keys: 42, pitch: 'pica' },
  { manufacturer: 'Royal', model: 'Futura 800', keys: 44, pitch: 'elite' },
  { manufacturer: 'Remington', model: 'Quiet-Riter', keys: 44, pitch: 'pica' },
  { manufacturer: 'Remington', model: 'Envoy III', keys: 42, pitch: 'pica' },
  { manufacturer: 'Remington', model: 'Travel-Riter', keys: 42, pitch: 'pica' },
  { manufacturer: 'Smith-Corona', model: 'Silent', keys: 44, pitch: 'pica' },
  { manufacturer: 'Smith-Corona', model: 'Silent-Super', keys: 44, pitch: 'pica' },
  { manufacturer: 'Smith-Corona', model: 'Skyriter', keys: 42, pitch: 'elite' },
  { manufacturer: 'Smith-Corona', model: 'Clipper', keys: 42, pitch: 'pica' },
  { manufacturer: 'Underwood', model: 'Universal Portable', keys: 42, pitch: 'pica' },
  { manufacturer: 'Underwood', model: 'Leader', keys: 44, pitch: 'pica' },
  { manufacturer: 'Underwood', model: 'Golden Touch', keys: 44, pitch: 'pica' },
  { manufacturer: 'Hermes', model: 'Baby', keys: 42, pitch: 'pica' },
  { manufacturer: 'Hermes', model: '2000', keys: 44, pitch: 'pica' },
  { manufacturer: 'Hermes', model: '3000', keys: 44, pitch: 'elite' },
  { manufacturer: 'Hermes', model: 'Rocket', keys: 42, pitch: 'pica' },
  { manufacturer: 'Torpedo', model: '18', keys: 44, pitch: 'pica' },
  { manufacturer: 'Groma', model: 'Kolibri', keys: 42, pitch: 'pica' },
]

// Row distribution (number/upper/home/lower, top to bottom) for each real
// keys-per-machine count a typewriter model can report — shared by
// TypewriterSettingsNeo (the picker) and KeyboardNeo (the renderer) so the two
// never drift apart.
export const KEYS_NUMBER_ITEMS: { label: string; value: number; rows: number[] }[] = [
  { label: '42', value: 42, rows: [10, 11, 11, 10] },
  { label: '43', value: 43, rows: [10, 11, 11, 11] },
  { label: '44', value: 44, rows: [11, 11, 11, 11] },
  { label: '45', value: 45, rows: [12, 11, 11, 11] },
  { label: '46', value: 46, rows: [12, 11, 12, 11] },
]

const DEFAULT_KEYS_ROW_CONFIG = KEYS_NUMBER_ITEMS[2]!.rows // 44 keys

export function getKeysRowConfig(keysNumber: number): number[] {
  return KEYS_NUMBER_ITEMS.find((item) => item.value === keysNumber)?.rows ?? DEFAULT_KEYS_ROW_CONFIG
}

// Stand-in model for "the two dials were set by hand, not picked from the list
// above" — surfaced as its own item (manufacturer 'none', model 'custom') at
// the bottom of typewriterModelSelectItems() rather than as a group, and the
// UI switches to it whenever charPitch/keysNumber are edited directly.
export const CUSTOM_TYPEWRITER_MODEL: TypewriterModel = { manufacturer: 'none', model: 'custom', keys: 0, pitch: 'pica' }

export function typewriterModelId(m: TypewriterModel): string {
  return `${m.manufacturer}::${m.model}`
}

export function isCustomTypewriterModel(m: TypewriterModel | null | undefined): boolean {
  return !!m && typewriterModelId(m) === typewriterModelId(CUSTOM_TYPEWRITER_MODEL)
}

export function findTypewriterModelById(id: string | null | undefined): TypewriterModel | undefined {
  if (id === typewriterModelId(CUSTOM_TYPEWRITER_MODEL)) return CUSTOM_TYPEWRITER_MODEL
  return TYPEWRITER_MODELS.find((m) => typewriterModelId(m) === id)
}

// One sub-array per manufacturer (rendered as a USelect group), both
// manufacturers and models within each group sorted alphabetically, plus a
// final ungrouped "custom" entry.
export function typewriterModelSelectItems() {
  const byManufacturer = new Map<string, TypewriterModel[]>()
  for (const m of TYPEWRITER_MODELS) {
    if (!byManufacturer.has(m.manufacturer)) byManufacturer.set(m.manufacturer, [])
    byManufacturer.get(m.manufacturer)!.push(m)
  }

  const manufacturerGroups = [...byManufacturer.keys()].sort((a, b) => a.localeCompare(b)).map((manufacturer) => [
    { type: 'label' as const, label: manufacturer },
    ...byManufacturer.get(manufacturer)!
      .slice()
      .sort((a, b) => a.model.localeCompare(b.model))
      .map((m) => ({ label: m.model, value: typewriterModelId(m) })),
  ])

  return [
    ...manufacturerGroups,
    [{ label: CUSTOM_TYPEWRITER_MODEL.model, value: typewriterModelId(CUSTOM_TYPEWRITER_MODEL) }],
  ]
}
