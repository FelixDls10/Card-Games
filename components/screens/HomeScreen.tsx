import { Difficulty } from '../../types';
import { Language, t } from '../../i18n';

export function HomeScreen({ onStart, difficulty, setDifficulty, lang }: { 
    onStart: () => void, 
    difficulty: Difficulty, 
    setDifficulty: (d: Difficulty) => void,
    lang: Language
}) {
    return (
        <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center px-6 md:px-12 py-12 md:py-0 mb-24 md:mb-0 relative z-10 min-h-[calc(100vh-120px)]">
            {/* Background decorative mesh */}
            <div className="absolute inset-0 architect-grid pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_20%,transparent_100%)]"></div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                
                {/* Left Column: Text & Controls */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                    <div className="space-y-6">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] ring-1 ring-primary/20 backdrop-blur-sm shadow-sm">
                            {t[lang].mentalClarity}
                        </div>
                        <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-blue-400 pb-2">
                            {t[lang].appTitle.split(' ')[0]}
                        </h2>
                        <p className="text-lg md:text-xl text-outline font-medium max-w-md mx-auto lg:mx-0">
                            {t[lang].subtitle}
                        </p>
                    </div>

                    <div className="w-full max-w-md space-y-6 pt-4">
                        <div className="space-y-3 text-left">
                            <label className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-outline uppercase ml-1 block">{t[lang].difficultyLabel}</label>
                            <div className="flex bg-surface-container-high/50 p-1.5 rounded-2xl ring-1 ring-inset ring-outline-variant/50 relative shadow-inner">
                                {['EASY', 'MEDIUM', 'HARD'].map((diff) => (
                                    <button 
                                        key={diff}
                                        onClick={() => setDifficulty(diff as 'EASY' | 'MEDIUM' | 'HARD')}
                                        className={`flex-1 relative z-10 py-3 sm:py-4 rounded-[0.8rem] text-[10px] sm:text-xs font-bold tracking-[0.1em] transition-all duration-300 ${
                                            difficulty === diff 
                                                ? 'text-white bg-primary shadow-lg shadow-primary/40 ring-1 ring-primary' 
                                                : 'text-outline hover:text-on-surface hover:bg-surface-container-highest/20'
                                        }`}
                                    >
                                        {diff === 'EASY' ? t[lang].easy : diff === 'MEDIUM' ? t[lang].medium : t[lang].hard}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button onClick={onStart} className="group relative w-full h-16 sm:h-20 rounded-2xl text-sm sm:text-base font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-3 overflow-hidden shadow-xl shadow-accent/20 active:scale-95 transition-all">
                            <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                            <span className="relative z-10 text-white flex items-center gap-4">
                                <span>{t[lang].play}</span>
                                <span className="material-symbols-outlined text-xl sm:text-2xl filled group-hover:translate-x-1 transition-transform">play_arrow</span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Right Column: Visual Showcase */}
                <div className="hidden lg:flex relative justify-center items-center h-full min-h-[400px]">
                    <div className="relative w-[320px] h-[320px] xl:w-[400px] xl:h-[400px]">
                        {/* Background Floating Elements */}
                        <div className="absolute -top-12 -right-8 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                        
                        {/* Primary Decorative Card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-br from-primary to-blue-700 rounded-[2.5rem] shadow-2xl shadow-primary/30 rotate-12 transform-gpu transition-all hover:rotate-6 hover:scale-105 duration-500 z-10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[8rem] text-white/20">memory</span>
                        </div>
                        
                        {/* Secondary Glass Card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-blue-50/80 dark:bg-[#0f172a]/80 rounded-[2.5rem] border-2 border-primary/20 dark:border-primary/40 -rotate-6 transform-gpu flex items-center justify-center shadow-2xl backdrop-blur-xl transition-all hover:-rotate-2 hover:scale-105 hover:border-primary/50 duration-500 z-20">
                            <div className="absolute inset-4 rounded-[1.8rem] border border-blue-400/20 shadow-inner"></div>
                            <span className="material-symbols-outlined text-[8rem] text-primary/80 drop-shadow-lg">architecture</span>
                        </div>

                        {/* Floating Floating Accent Card */}
                        <div className="absolute -right-6 top-1/4 w-28 h-28 bg-gradient-to-br from-accent to-orange-500 rounded-2xl shadow-xl shadow-accent/20 rotate-12 transform-gpu flex items-center justify-center z-30 animate-float">
                            <span className="material-symbols-outlined text-4xl text-white">star</span>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
