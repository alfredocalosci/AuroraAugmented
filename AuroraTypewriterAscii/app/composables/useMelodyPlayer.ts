import { ref, toValue } from 'vue'
import type { ComputedRef, MaybeRefOrGetter, Ref } from 'vue'
import * as Tone from 'tone'
import type { MelodyEvent, MelodyTimeline } from '~/utils/melody/types'

export type MelodyParticleKind = 'note' | 'shift' | 'carriageReturn' | 'space'

export interface MelodyParticle {
  id: number
  x: number
  kind: MelodyParticleKind
  /** the character this particle represents - the typed char for 'note'/
   * 'space', the shiftToggle glyph for 'shift', unset for 'carriageReturn' */
  char?: string
  /** performance.now() ms timestamps - wall-clock, deliberately not tied to
   * Tone.Transport time, so an already-spawned particle keeps falling even
   * after the transport is stopped on pause */
  spawnAt: number
  landAt: number
}

/** fired whenever a beat actually sounds, so a keyboard display can flash
 * whatever physically "sounded" - a typed key (+ shiftToggle, when
 * needsShift) or the carriage-return lever, which isn't a keyboard key */
export type SoundEvent =
  | { type: 'note'; char: string; needsShift: boolean }
  | { type: 'carriageReturn' }

export interface UseMelodyPlayerOptions {
  /** how many beats a dot takes to fall from top to bottom */
  fallBeats?: number
  /** x position for carriage-return particles, which aren't tied to a key */
  carriageReturnX?: MaybeRefOrGetter<number>
  /** fired with the new lineIndex whenever a note actually sounds */
  onNote?: (rowIndex: number, lineIndex: number) => void
  /** fired with the new rowIndex on the last beat of a row's carriage-return block */
  onCarriageReturn?: (rowIndex: number) => void
  /** fired on every beat that actually sounds - see SoundEvent */
  onSound?: (event: SoundEvent) => void
}

/**
 * Owns audio playback (persistent pooled Tone.js synths, transport-scheduled
 * notes) and the falling-dot animation for guitarHeroEvo. Animation and audio
 * are deliberately decoupled: spawning/sound/counting are all driven by
 * Tone.Transport (so pausing halts them immediately), while each particle's
 * fall itself runs on wall-clock time via requestAnimationFrame, so dots
 * already in flight at the moment of a pause finish landing silently instead
 * of freezing mid-air.
 */
export function useMelodyPlayer(
  timeline: Ref<MelodyTimeline> | ComputedRef<MelodyTimeline>,
  options: UseMelodyPlayerOptions = {}
) {
  const fallBeats = options.fallBeats ?? 4

  const particles = ref<MelodyParticle[]>([])
  // ticks every animation frame while particles are on screen - components
  // read this to derive each particle's fall progress reactively
  const nowMs = ref(performance.now())

  let noteSynth: Tone.PolySynth<Tone.Synth> | null = null
  let crSynth: Tone.MembraneSynth | null = null
  // dedicated low bass/percussion voice for the spacebar - kept separate from
  // crSynth (carriage return) even though both are MembraneSynths, since the
  // two need to stay distinguishable from each other and are tuned/pitched
  // independently
  let spaceSynth: Tone.MembraneSynth | null = null
  let nextParticleId = 0
  let rafHandle: number | null = null

  const ensureSynths = async () => {
    if (noteSynth && crSynth && spaceSynth) return
    await Tone.start()
    noteSynth = new Tone.PolySynth(Tone.Synth).toDestination()
    crSynth = new Tone.MembraneSynth().toDestination()
    spaceSynth = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 6,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.2 },
    }).toDestination()
  }

  const ensureAnimationLoop = () => {
    if (rafHandle !== null) return
    const tick = () => {
      const now = performance.now()
      nowMs.value = now
      particles.value = particles.value.filter((p) => now < p.landAt)
      rafHandle = particles.value.length > 0 ? requestAnimationFrame(tick) : null
    }
    rafHandle = requestAnimationFrame(tick)
  }

  const spawnParticle = (x: number, kind: MelodyParticleKind, fallDurationMs: number, char?: string) => {
    const now = performance.now()
    particles.value.push({ id: nextParticleId++, x, kind, char, spawnAt: now, landAt: now + fallDurationMs })
    ensureAnimationLoop()
  }

  const scheduleEvent = (
    transport: ReturnType<typeof Tone.getTransport>,
    event: MelodyEvent,
    relativeTime: number,
    beatDuration: number,
    isLastCarriageReturnOfRow: boolean
  ) => {
    const fallDuration = fallBeats * beatDuration
    const fallDurationMs = fallDuration * 1000
    // every spawn happens at its natural relativeTime (dots start falling the
    // instant play/resume begins); the sound is pushed fallDuration later so
    // the dot has fully landed by the time it sounds. This shifts the whole
    // schedule uniformly by fallDuration - a silent lead-in on every play()
    // call - rather than clamping spawnTime to 0, which used to truncate the
    // fall for early events and make them sound before their dot arrived.
    const soundTime = relativeTime + fallDuration

    if (event.type === 'note' && event.x !== undefined) {
      transport.scheduleOnce((time) => {
        Tone.getDraw().schedule(() => {
          spawnParticle(event.x!, event.isSpace ? 'space' : 'note', fallDurationMs, event.char)
          if (event.shiftX !== undefined) spawnParticle(event.shiftX, 'shift', fallDurationMs, '⬆')
        }, time)
      }, relativeTime)

      transport.scheduleOnce((time) => {
        Tone.getDraw().schedule(() => {
          if (event.isSpace) {
            spaceSynth?.triggerAttackRelease('C1', '8n')
          } else {
            noteSynth?.triggerAttackRelease(event.note!, '8n')
          }
          if (event.shiftNote) noteSynth?.triggerAttackRelease(event.shiftNote, '8n')
          options.onNote?.(event.rowIndex, event.lineIndex + 1)
          options.onSound?.({ type: 'note', char: event.char!, needsShift: Boolean(event.shiftNote) })
        }, time)
      }, soundTime)
    } else if (event.type === 'carriageReturn') {
      const crX = toValue(options.carriageReturnX) ?? 0
      transport.scheduleOnce((time) => {
        Tone.getDraw().schedule(() => spawnParticle(crX, 'carriageReturn', fallDurationMs), time)
      }, relativeTime)

      transport.scheduleOnce((time) => {
        Tone.getDraw().schedule(() => {
          crSynth?.triggerAttackRelease('C2', '16n')
          options.onSound?.({ type: 'carriageReturn' })
          if (isLastCarriageReturnOfRow) options.onCarriageReturn?.(event.rowIndex + 1)
        }, time)
      }, soundTime)
    }
    // 'rest' events need no scheduling - they're just gaps between beats
  }

  const play = async (startIndex: number) => {
    await ensureSynths()

    const transport = Tone.getTransport()
    transport.cancel(0)
    transport.stop()
    transport.seconds = 0

    const { events, beatDuration } = timeline.value
    const baseTime = events[startIndex]?.time ?? 0

    for (let i = startIndex; i < events.length; i++) {
      const event = events[i]!
      const isLastCarriageReturnOfRow =
        event.type === 'carriageReturn' &&
        (events[i + 1] === undefined || events[i + 1]!.rowIndex !== event.rowIndex)
      scheduleEvent(transport, event, event.time - baseTime, beatDuration, isLastCarriageReturnOfRow)
    }

    transport.start()
  }

  // stops all future spawn/sound/count callbacks immediately; particles
  // already on screen are untouched and keep falling via the rAF loop above
  const pause = () => {
    Tone.getTransport().stop()
  }

  const stopAll = () => {
    Tone.getTransport().stop()
    particles.value = []
  }

  return { particles, nowMs, play, pause, stopAll }
}
