import { Pause, Moon, Sun, Bell, User, LayoutGrid } from 'lucide-react';
import { t } from '../i18n.js';

export function Header({ screen, sessionId, onPause, isDark, toggleTheme, lang, setLang }) {
  const tx = t[lang];

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-300px)] h-16 glass-panel flex items-center justify-between px-4 md:px-8 z-40 !border-t-0 !border-x-0 !rounded-none">
      <div className="flex items-center gap-2 md:gap-4 truncate">
        <LayoutGrid size={20} className="md:hidden text-primary flex-shrink-0" />
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

        <div className="flex items-center text-outline gap-1">
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
          <button className="hidden md:flex w-10 h-10 hover:text-primary hover:bg-surface-container/50 rounded-full items-center justify-center active:scale-95 transition-all">
            <Bell size={18} />
          </button>
        </div>

        {(screen === 'PLAYING' || screen === 'HOME') && (
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center ml-1 md:ml-2 ring-2 ring-primary/20">
            <User size={16} />
          </div>
        )}
      </div>
    </header>
  );
}
