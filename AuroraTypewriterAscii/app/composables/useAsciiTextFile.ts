import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export interface AsciiTextFile {
  text: string
  lines: string[]
  /** Number of rows in the ascii image (its "height" in lines). */
  rowsInImage: number
  charsPerLine: number[]
}

const EMPTY_ASCII_TEXT_FILE: AsciiTextFile = {
  text: '',
  lines: [],
  rowsInImage: 0,
  charsPerLine: [],
}

function parseAsciiText(text: string): AsciiTextFile {
  const lines = text.replace(/\r\n|\r|\n$/, '').split(/\r\n|\r|\n/)
  return {
    text,
    lines,
    rowsInImage: lines.length,
    charsPerLine: lines.map((line) => line.length),
  }
}

/**
 * Reactively loads a .txt ascii-art file from /public/img/gallery/ascii_img/<name>,
 * fetching on first load and re-fetching whenever `fileName` changes.
 */
export function useAsciiTextFile(fileName: MaybeRefOrGetter<string> = 'catFace.txt') {
  const { data, pending, error, refresh } = useAsyncData(
    () => `ascii-text-${toValue(fileName)}`,
    () => {
      const name = toValue(fileName)
      if (!name) return Promise.resolve(EMPTY_ASCII_TEXT_FILE)
      return $fetch<string>(`/img/gallery/ascii_img/${name}`, {
        responseType: 'text',
      }).then(parseAsciiText)
    },
    { watch: [() => toValue(fileName)], default: () => EMPTY_ASCII_TEXT_FILE, server: false }
  )

  return {
    text: computed(() => data.value?.text ?? ''),
    lines: computed(() => data.value?.lines ?? []),
    rowsInImage: computed(() => data.value?.rowsInImage ?? 0),
    charsPerLine: computed(() => data.value?.charsPerLine ?? []),
    pending,
    error,
    refresh,
  }
}
