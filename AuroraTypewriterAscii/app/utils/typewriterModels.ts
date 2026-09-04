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

export function typewriterModelId(m: TypewriterModel): string {
  return `${m.manufacturer}::${m.model}`
}

export function findTypewriterModelById(id: string | null | undefined): TypewriterModel | undefined {
  return TYPEWRITER_MODELS.find((m) => typewriterModelId(m) === id)
}

// One sub-array per manufacturer (rendered as a USelect group), both
// manufacturers and models within each group sorted alphabetically.
export function typewriterModelSelectItems() {
  const byManufacturer = new Map<string, TypewriterModel[]>()
  for (const m of TYPEWRITER_MODELS) {
    if (!byManufacturer.has(m.manufacturer)) byManufacturer.set(m.manufacturer, [])
    byManufacturer.get(m.manufacturer)!.push(m)
  }

  return [...byManufacturer.keys()].sort((a, b) => a.localeCompare(b)).map((manufacturer) => [
    { type: 'label' as const, label: manufacturer },
    ...byManufacturer.get(manufacturer)!
      .slice()
      .sort((a, b) => a.model.localeCompare(b.model))
      .map((m) => ({ label: m.model, value: typewriterModelId(m) })),
  ])
}
