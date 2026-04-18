import { useState } from 'react';
import { Pause, Moon, Sun, Bell, User, Menu, Volume2, VolumeX } from 'lucide-react';
import { t } from '../i18n.js';
import { useSound } from '../hooks/useSound.jsx';

export function Header({ screen, sessionId, onPause, isDark, toggleTheme, lang, setLang, onMenuClick }) {
  const tx = t[lang];
  const { enabled: soundEnabled, setSoundEnabled, volume, setVolume } = useSound();
  const [showVolume, setShowVolume] = useState(false);

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-300px)] h-16 glass-panel flex items-center justify-between px-4 md:px-8 z-40 border-t-0! border-x-0! rounded-none!">
      <div className="flex items-center gap-2 md:gap-4 truncate">
        {/*<button onClick={onMenuClick} className="md:hidden p-1 -ml-1 active:scale-95 transition-transform shrink-0">
          <Menu size={24} className="text-primary" />
        </button> */}
        <span className="text-base md:text-[1.1rem] font-bold text-on-surface tracking-tight truncate">{tx.appTitle}</span>
        {screen === 'PLAYING' && (
          <>
            <div className="hidden md:block h-4 w-px bg-outline-variant/50" />
            <span className="hidden md:block text-xs font-semibold text-primary/70 tracking-wide uppercase">
              {tx.session} {sessionId}
            </span>
          </>
        )}
      </div>

              

      <div className="flex items-center gap-2 md:gap-4">
        {screen === 'PLAYING' && (
          <button
            onClick={onPause}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-surface-container-lowest/50 text-primary rounded-full border border-outline-variant/30 hover:bg-surface-container transition-all active:scale-95"
          >
            <Pause size={18} />
          </button>
        )}

        {/* Opciones en móvil */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="h-9 px-2 text-xs font-bold tracking-widest rounded-full hover:bg-surface-container/50"
          >
            {lang.toUpperCase()}
          </button>

          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container/50"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowVolume(!showVolume)}
              aria-label={soundEnabled ? tx.soundOn : tx.soundOff}
              aria-pressed={soundEnabled}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container/50"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            {showVolume && (
              <div className="absolute right-0 top-10 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-3 w-40 z-50 shadow-lg">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  disabled={!soundEnabled}
                  aria-label={tx.volume}
                  className="w-full accent-primary disabled:opacity-40 cursor-pointer"
                />
                <div className="text-xs text-outline text-center mt-2">{Math.round(volume * 100)}%</div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center text-outline gap-1">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="h-9 md:h-10 px-3 hover:text-primary hover:bg-surface-container/50 rounded-full flex items-center justify-center active:scale-95 transition-all text-sm font-bold tracking-widest"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 md:w-10 md:h-10 hover:text-primary hover:bg-surface-container/50 rounded-full flex items-center justify-center active:scale-95 transition-all"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="relative">
            <button
              onClick={() => setShowVolume(!showVolume)}
              aria-label={soundEnabled ? tx.soundOn : tx.soundOff}
              aria-pressed={soundEnabled}
              className="w-9 h-9 md:w-10 md:h-10 hover:text-primary hover:bg-surface-container/50 rounded-full flex items-center justify-center active:scale-95 transition-all"
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            {showVolume && (
              <div className="absolute right-0 top-12 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-3 w-48 z-50 shadow-lg">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  disabled={!soundEnabled}
                  aria-label={tx.volume}
                  className="w-full accent-primary disabled:opacity-40 cursor-pointer"
                />
                <div className="text-xs text-outline text-center mt-2">{Math.round(volume * 100)}%</div>
              </div>
            )}
          </div>
          <button className="hidden md:flex w-10 h-10 hover:text-primary hover:bg-surface-container/50 rounded-full items-center justify-center active:scale-95 transition-all">
            <Bell size={18} />
          </button>
        </div>

        {(screen === 'PLAYING' || screen === 'HOME') && (
          <div className="flex h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-600 text-white items-center justify-center ml-1 md:ml-2 ring-2 ring-primary/20 cursor-pointer">
            <User size={16} />
          </div>
        )}
      </div>
    </header>
  );
}
