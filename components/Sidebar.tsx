import React from 'react';
import { Language, t } from '../i18n';

export function Sidebar({ state, onNewGame, onExit, metrics, difficulty, gridSize, lang }: { 
    state: string, 
    onNewGame: () => void, 
    onExit: () => void,
    metrics?: any,
    difficulty?: string,
    gridSize?: string,
    lang: Language
}) {
  return (
    <aside className="fixed left-0 top-0 h-full w-[300px] bg-surface-lowest/40 backdrop-blur-3xl border-r border-outline-variant/20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] hidden md:flex flex-col py-8 px-6 overflow-y-auto z-50">
      <div className="mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/20 flex items-center justify-center text-white">
            <span className="material-symbols-outlined">architecture</span>
        </div>
        <div>
            <h1 className="text-[1.1rem] font-black tracking-tight text-on-surface leading-none">{t[lang].appTitle.split(' ')[0]}</h1>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-primary mt-1 font-bold">{t[lang].appTitle.split(' ')[1]}</p>
        </div>
      </div>
      
      {state === 'PLAYING' || state === 'PAUSED' ? (
        <React.Fragment>
            <div className="mb-8 p-4 rounded-2xl bg-primary/5 border-2 border-primary/40 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-outline">{t[lang].level}</span>
                <span className="text-xs font-extrabold text-primary bg-primary/10 px-2 py-1 rounded-md">{difficulty === 'EASY' ? t[lang].easy : difficulty === 'MEDIUM' ? t[lang].medium : t[lang].hard}</span>
            </div>
            
            <nav className="flex-1 space-y-4">
                <div className="space-y-8 border-t border-outline-variant/30 pt-8 relative">
                    <div className="absolute top-0 left-0 w-8 h-px bg-primary/30"></div>
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold">{t[lang].timeElapsedLong}</span>
                        <p className="text-4xl font-light tabular-nums tracking-tighter text-on-surface">
                            {String(Math.floor(metrics.timeElapsed / 60)).padStart(2, '0')}<span className="text-outline-variant">:</span>{String(metrics.timeElapsed % 60).padStart(2, '0')}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold">{t[lang].moves}</span>
                            <p className="text-2xl font-semibold tracking-tight text-primary">{metrics.moves}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold">{t[lang].pairs}</span>
                            <p className="text-2xl font-semibold tracking-tight text-accent">{metrics.pairsFound} <span className="text-sm text-outline font-normal">/ {metrics.totalPairs}</span></p>
                        </div>
                    </div>
                </div>
            </nav>
        </React.Fragment>
      ) : (
          <nav className="flex-1 space-y-1">
            <button className="w-full flex items-center justify-start gap-4 py-3 px-4 bg-primary/10 text-primary font-bold rounded-xl transition-all duration-200">
              <span className="material-symbols-outlined filled">analytics</span>
              <span className="text-[11px] uppercase tracking-[0.1em]">{t[lang].currentProgress}</span>
            </button>
            <button className="w-full flex items-center justify-start gap-4 py-3 px-4 text-outline hover:text-on-surface transition-colors hover:bg-surface-container-high/50 rounded-xl transition-all duration-200">
              <span className="material-symbols-outlined">insights</span>
              <span className="text-[11px] uppercase tracking-[0.1em]">{t[lang].gameStats}</span>
            </button>
            <button className="w-full flex items-center justify-start gap-4 py-3 px-4 text-outline hover:text-on-surface transition-colors hover:bg-surface-container-high/50 rounded-xl transition-all duration-200">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-[11px] uppercase tracking-[0.1em]">{t[lang].settings}</span>
            </button>
          </nav>
      )}

      <div className="mt-auto space-y-4 border-t border-outline-variant/30 pt-8 relative">
        <div className="absolute top-0 left-0 w-8 h-px bg-outline-variant"></div>
        {state === 'HOME' ? (
             <button onClick={onNewGame} className="relative w-full overflow-hidden rounded-xl group active:scale-95 transition-all">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                <div className="relative z-10 py-4 px-6 flex items-center justify-center gap-2 text-white font-bold text-sm tracking-widest uppercase shadow-lg shadow-accent/25">
                    <span>{t[lang].newGame}</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </div>
             </button>
        ) : (
            null
        )}
       
        <button onClick={onExit} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-outline hover:text-error hover:bg-error/10 transition-colors px-4 font-semibold">
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span className="text-[11px] uppercase tracking-wider">{t[lang].exit}</span>
        </button>
      </div>
    </aside>
  );
}
