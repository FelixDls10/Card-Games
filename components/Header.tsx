import { Language, t } from '../i18n';

export function Header({ state, sessionId, onPause, isDarkMode, toggleTheme, lang, setLang }: { state: string, sessionId?: string, onPause?: () => void, isDarkMode?: boolean, toggleTheme?: () => void, lang: Language, setLang: (l: Language) => void }) {
    return (
      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-300px)] h-16 glass-panel flex items-center justify-between px-4 md:px-8 z-40 !border-t-0 !border-x-0 !rounded-none">
        <div className="flex items-center gap-2 md:gap-4 truncate">
          <span className="md:hidden material-symbols-outlined text-primary flex-shrink-0">grid_view</span>
          <span className="text-base md:text-[1.1rem] font-bold text-on-surface tracking-tight truncate">{t[lang].appTitle}</span>
          {state === 'PLAYING' && (
              <>
                 <div className="hidden md:block h-4 w-px bg-outline-variant/50"></div>
                 <span className="hidden md:block text-xs font-semibold text-primary/70 tracking-wide uppercase">{t[lang].session} {sessionId}</span>
              </>
          )}
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
            {state === 'PLAYING' && onPause && (
                 <button 
                    onClick={onPause}
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-surface-lowest/50 text-primary rounded-full border border-outline-variant/30 hover:bg-surface-container transition-all active:scale-95"
                    title={t[lang].pauseTitle}
                >
                    <span className="material-symbols-outlined text-xl">pause</span>
                </button>
            )}
            
            <div className="flex items-center text-outline gap-1">
                <button 
                   onClick={() => setLang(lang === 'es' ? 'en' : 'es')} 
                   className="h-9 md:h-10 px-3 hover:text-primary hover:bg-surface-container/50 rounded-full flex items-center justify-center active:scale-95 transition-all text-sm font-bold tracking-widest"
                   title="Change Language"
                >
                    {lang.toUpperCase()}
                </button>
                <button onClick={toggleTheme} className="w-9 h-9 md:w-10 md:h-10 hover:text-primary hover:bg-surface-container/50 rounded-full flex items-center justify-center active:scale-95 transition-all" title="Alternar tema">
                    <span className="material-symbols-outlined text-[20px] md:text-[22px]">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
                </button>
                <button className="w-9 h-9 md:w-10 md:h-10 hover:text-primary hover:bg-surface-container/50 rounded-full items-center justify-center active:scale-95 transition-all hidden md:flex">
                    <span className="material-symbols-outlined text-[20px] md:text-[22px]">notifications</span>
                </button>
            </div>
            {state === 'PLAYING' || state === 'HOME' ? (
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white overflow-hidden shadow-md flex items-center justify-center ml-1 md:ml-2 ring-2 ring-primary/20">
                   <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
            ) : null}
        </div>
      </header>
    );
  }
