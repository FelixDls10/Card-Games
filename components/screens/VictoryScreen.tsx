import { GameMetrics } from "../../types";
import { Language, t } from "../../i18n";

export function VictoryScreen({ metrics, onRestart, onHome, lang }: {
    metrics: GameMetrics,
    onRestart: () => void,
    onHome: () => void,
    lang: Language
}) {
    return (
        <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 mb-24 md:mb-0 relative z-10 glass-panel !bg-transparent !border-0 !shadow-none">
            {/* Background elements */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                 <div className="w-64 h-64 bg-accent/20 rounded-full blur-[100px]"></div>
                 <div className="w-64 h-64 bg-primary/20 rounded-full blur-[100px] -ml-20"></div>
            </div>

            <div className="max-w-3xl w-full glass-panel rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none mix-blend-overlay">
                    {/* Decorative architectural rings */}
                    <div className="absolute inset-0 border-4 border-primary rounded-full transform translate-x-1/3 -translate-y-1/3 scale-[1.5]"></div>
                    <div className="absolute inset-0 border-4 border-primary rounded-full transform translate-x-1/2 -translate-y-1/2 scale-125"></div>
                </div>

                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

                <div className="text-center mb-16 relative z-10">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-accent to-orange-500 rounded-[2rem] text-white mb-8 shadow-2xl shadow-accent/30 rotate-12 transform-gpu hover:rotate-0 transition-transform duration-500">
                        <span className="material-symbols-outlined text-5xl filled">workspace_premium</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-blue-400 mb-4">{t[lang].victoryTitle}</h1>
                    <p className="text-outline font-bold tracking-[0.2em] uppercase text-xs">{t[lang].victorySub}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10 w-full max-w-2xl mx-auto">
                    <div className="bg-surface-lowest/50 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center justify-center ring-1 ring-inset ring-outline-variant/30 hover:bg-surface-lowest/70 transition-colors shadow-sm">
                        <span className="text-outline mb-3 uppercase tracking-[0.1em] text-[10px] font-bold">{t[lang].totalTime}</span>
                        <span className="text-3xl md:text-4xl font-light tabular-nums tracking-tighter text-on-surface">{String(Math.floor(metrics.timeElapsed / 60)).padStart(2, '0')}<span className="text-outline-variant">:</span>{String(metrics.timeElapsed % 60).padStart(2, '0')}</span>
                    </div>

                    <div className="bg-gradient-to-br from-primary to-blue-800 p-8 rounded-3xl flex flex-col items-center justify-center text-white transform md:scale-[1.03] shadow-2xl shadow-primary/20 ring-1 ring-white/20">
                        <span className="text-blue-200 mb-3 uppercase tracking-[0.1em] text-[10px] font-bold">{t[lang].totalMoves}</span>
                        <span className="text-5xl md:text-6xl font-bold tracking-tighter drop-shadow-md">{metrics.moves}</span>
                    </div>

                    <div className="bg-surface-lowest/50 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center justify-center ring-1 ring-inset ring-outline-variant/30 hover:bg-surface-lowest/70 transition-colors shadow-sm">
                        <span className="text-outline mb-3 uppercase tracking-[0.1em] text-[10px] font-bold">{t[lang].pairsFound}</span>
                        <span className="text-3xl md:text-4xl font-light tracking-tighter text-on-surface">{metrics.pairsFound}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6 relative z-10">
                    <button onClick={onRestart} className="group relative w-full max-w-sm h-16 rounded-2xl text-sm font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-3 overflow-hidden shadow-xl shadow-accent/20 active:scale-95 transition-all">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                        <span className="relative z-10 text-white flex items-center gap-3">
                            <span className="material-symbols-outlined text-xl">replay</span>
                            {t[lang].playAgain}
                        </span>
                    </button>
                    
                    <div className="flex items-center gap-6 mt-2">
                        <button onClick={onHome} className="text-outline hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors py-2 px-4 rounded-xl hover:bg-surface-container-high/50">
                            {t[lang].changeDifficulty}
                        </button>
                        <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
                        <button onClick={onHome} className="text-outline hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors py-2 px-4 rounded-xl hover:bg-surface-container-high/50 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">home</span>
                            {t[lang].home}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
