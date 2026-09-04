import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { KeyPosition } from '~/utils/keyboardLayouts/types'
import { buildMelodyTimeline } from '~/utils/melody/buildMelodyTimeline'
import type { BuildMelodyOptions } from '~/utils/melody/types'

type MelodyBuildParams = Pick<BuildMelodyOptions, 'bpm' | 'maxRunBeats' | 'carriageReturnBeats'>

/**
 * Reactive wrapper around buildMelodyTimeline: recomputes whenever the ascii
 * image, key positions, or rhythm params change. Being a plain computed, this
 * works identically in 'idle' mode - giving duration-estimate and
 * precompute-while-idle behavior for free.
 */
export function useMelodyTimeline(
  asciiImageString: MaybeRefOrGetter<string>,
  keyPositions: MaybeRefOrGetter<KeyPosition[]>,
  params: MaybeRefOrGetter<MelodyBuildParams> = {}
) {
  const timeline = computed(() =>
    buildMelodyTimeline({
      asciiImageString: toValue(asciiImageString),
      keyPositions: toValue(keyPositions),
      ...toValue(params),
    })
  )

  // locates the first event at/after the given (rowIndex, lineIndex)
  // playback position, so play()/resume() always starts from the last
  // confirmed note rather than replaying or skipping beats
  const findResumeIndex = (rowIndex: number, lineIndex: number) => {
    const index = timeline.value.events.findIndex(
      (event) => event.rowIndex === rowIndex && event.lineIndex === lineIndex
    )
    return index === -1 ? 0 : index
  }

  return { timeline, findResumeIndex }
}
