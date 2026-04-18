import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';

const SOUND_SRC = {
  correct: '/sounds/correct.mp3',
  wrong:   '/sounds/wrong.mp3',
};

const STORAGE_KEY = 'arch-memory-sound';
const DEFAULTS = { enabled: true, volume: 0.3 };

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);
  const poolRef = useRef({});
  const [announcement, setAnnouncement] = useState('');
  const announceTimerRef = useRef(null);

  useEffect(() => {
    Object.entries(SOUND_SRC).forEach(([name, src]) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      poolRef.current[name] = audio;
    });
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch {}
    Object.values(poolRef.current).forEach(a => { a.volume = settings.volume; });
  }, [settings]);

  const play = useCallback((name) => {
    if (!settings.enabled) return;
    const audio = poolRef.current[name];
    if (!audio) return;
    try {
      audio.currentTime = 0;
      audio.volume = settings.volume;
      audio.play().catch(() => {});
    } catch {}
  }, [settings]);

  const announce = useCallback((message) => {
    if (!message) return;
    setAnnouncement('');
    if (announceTimerRef.current) clearTimeout(announceTimerRef.current);
    announceTimerRef.current = setTimeout(() => setAnnouncement(message), 50);
  }, []);

  const setEnabled = useCallback((enabled) => setSettings(s => ({ ...s, enabled })), []);
  const setVolume  = useCallback((volume)  => setSettings(s => ({ ...s, volume })), []);

  const value = useMemo(
    () => ({ ...settings, play, announce, setEnabled, setVolume }),
    [settings, play, announce, setEnabled, setVolume]
  );

  return (
    <SoundContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
}
