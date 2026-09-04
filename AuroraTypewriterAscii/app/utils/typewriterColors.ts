// Color options for the typewriter body silhouette (the bg-*/border-* pairs
// drawn in app/pages/index.vue): black plus the custom brand palette defined
// as --color-*-tw theme tokens in app/assets/css/main.css's @theme block —
// Tailwind v4 auto-generates bg-*/border-* utilities from those tokens.
// Kept as complete, unbroken class name strings so Tailwind's scanner can
// find them at build time — a template-interpolated name like
// `bg-${color}-tw` would never be generated, since Tailwind never evaluates
// JS, it only greps source text.


/* not in use 
 verde: { label: 'Verde', bg: 'bg-verde-tw', border: 'border-verde-tw', hoverBorder: 'hover:border-verde-tw' },
    blu: { label: 'Blu', bg: 'bg-blu-tw', border: 'border-blu-tw', hoverBorder: 'hover:border-blu-tw' },
    azzurro: { label: 'Azzurro', bg: 'bg-azzurro-tw', border: 'border-azzurro-tw', hoverBorder: 'hover:border-azzurro-tw' },
   rosso: { label: 'Rosso', bg: 'bg-rosso-tw', border: 'border-rosso-tw', hoverBorder: 'hover:border-rosso-tw' },

*/



export const TYPEWRITER_COLORS = {
    black: { label: 'Black', bg: 'bg-mist-800', border: 'border-mist-800', hoverBorder: 'hover:border-mist-800', fill: 'fill-mist-800' },
 
    orange: { label: 'Orange', bg: 'bg-orange-500', border: 'border-orange-500', hoverBorder: 'hover:border-orange-500', fill: 'fill-orange-500' },

    giallo: { label: 'Giallo', bg: 'bg-giallo-tw', border: 'border-giallo-tw', hoverBorder: 'hover:border-giallo-tw', fill: 'fill-giallo-tw' },
    neutro: { label: 'Neutro', bg: 'bg-neutro-tw', border: 'border-neutro-tw', hoverBorder: 'hover:border-neutro-tw', fill: 'fill-neutro-tw' },
    neutro_2: { label: 'Neutro 2', bg: 'bg-neutro_2-tw', border: 'border-neutro_2-tw', hoverBorder: 'hover:border-neutro_2-tw', fill: 'fill-neutro_2-tw' },
    verdechiaro: { label: 'Verde chiaro', bg: 'bg-verdechiaro-tw', border: 'border-verdechiaro-tw', hoverBorder: 'hover:border-verdechiaro-tw', fill: 'fill-verdechiaro-tw' },
   
    revista: { label: 'Revista', bg: 'bg-revista-tw', border: 'border-revista-tw', hoverBorder: 'hover:border-revista-tw', fill: 'fill-revista-tw' },
} as const

export type TypewriterColorName = keyof typeof TYPEWRITER_COLORS
export const DEFAULT_TYPEWRITER_COLOR: TypewriterColorName = 'neutro'
