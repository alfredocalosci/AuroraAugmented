export type SettingsPanel = 'image' | 'ascii' | 'player' | 'keyboard'

const DEFAULT_SHOW_SETTINGS: Record<SettingsPanel, boolean> = {
  image: false,
  ascii: false,
  player: false,
  keyboard: false,
}

// site-wide settings-accordion open/closed state — shared via useState so playerLayout.vue's
// accordions and appSettings.vue's trigger buttons stay in sync, per useActiveTypewriterSettings' pattern
export function useShowSettings() {
  const showSettings = useState<Record<SettingsPanel, boolean>>('show-settings', () => ({ ...DEFAULT_SHOW_SETTINGS }))

  function toggleSettings(panel: SettingsPanel) {
    showSettings.value[panel] = !showSettings.value[panel]
  }

  return { showSettings, toggleSettings }
}
