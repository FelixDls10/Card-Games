import React, { useState, useEffect } from 'react';
import { Difficulty, GameMetrics } from '../../types';
import { Language, t } from '../../i18n';

const ARCH_ICONS = [
    'architecture', 'apartment', 'foundation', 'home', 
    'business', 'chair', 'bed', 'desk'
];

interface Card {
    id: number;
    icon: string;
    isMatched: boolean;
    isFlipped: boolean;
}

export function GameScreen({ difficulty, onVictory, setMetrics, lang }: {
    difficulty: Difficulty,
    onVictory: (metrics: GameMetrics) => void,
    setMetrics: (metrics: any) => void,
    lang: Language
}) {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [pairsFound, setPairsFound] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const sonidoAcierto = new Audio('/sounds/correct.mp3');
    const sonidoError = new Audio('/sounds/wrong.mp3');

    // 🟢 ACCESIBILIDAD
    const [mensajeAccesible, setMensajeAccesible] = useState('');

    const getGridConfig = () => {
        switch(difficulty) {
            case 'EASY': return { rows: 2, cols: 3, pairs: 3, class: 'grid-cols-3 w-full max-w-[700px]' };
            case 'MEDIUM': return { rows: 3, cols: 4, pairs: 6, class: 'grid-cols-4 w-full max-w-[900px]' };
            case 'HARD': return { rows: 4, cols: 4, pairs: 8, class: 'grid-cols-4 w-full max-w-[900px]' };
        }
    };

    const config = getGridConfig();

    useEffect(() => {
        const numPairs = config.pairs;
        const selectedIcons = ARCH_ICONS.slice(0, numPairs);
        const deck = [...selectedIcons, ...selectedIcons]
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({ id: index, icon, isMatched: false, isFlipped: false }));
        
        setCards(deck);
        setFlippedIndices([]);
        setMoves(0);
        setPairsFound(0);
        setTimeElapsed(0);
        setMensajeAccesible('');
    }, [difficulty]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setMetrics({
            timeElapsed, moves, pairsFound, totalPairs: config.pairs
        });
        
        if (pairsFound > 0 && pairsFound === config.pairs) {
            setTimeout(() => {
                onVictory({ timeElapsed, moves, pairsFound });
            }, 500);
        }
    }, [timeElapsed, moves, pairsFound, config.pairs]);

    const handleCardClick = (index: number) => {
        if (cards[index].isMatched || cards[index].isFlipped || flippedIndices.length >= 2) return;

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flippedIndices, index];
        setFlippedIndices(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            const [firstIndex, secondIndex] = newFlipped;

            if (cards[firstIndex].icon === cards[secondIndex].icon) {

                // 🟢 MENSAJE ACCESIBLE (acierto)
                setMensajeAccesible(
                    lang === 'es' ? 'Pareja encontrada' : 'Match found'
                );

                sonidoAcierto.currentTime = 0;
                sonidoAcierto.play();

                setTimeout(() => {
                    const matchedCards = [...cards];
                    matchedCards[firstIndex].isMatched = true;
                    matchedCards[secondIndex].isMatched = true;
                    setCards(matchedCards);
                    setPairsFound(p => p + 1);
                    setFlippedIndices([]);
                }, 500);

            } else {

                // 🟢 MENSAJE ACCESIBLE (error)
                setMensajeAccesible(
                    lang === 'es' ? 'Las cartas no coinciden' : 'Cards do not match'
                );

                sonidoError.currentTime = 0;
                sonidoError.play();

                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[firstIndex].isFlipped = false;
                    resetCards[secondIndex].isFlipped = false;
                    setCards(resetCards);
                    setFlippedIndices([]);
                }, 1000);
            }
        }
    };

    return (
        <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 py-8 md:py-12 architect-grid mb-24 md:mb-0 relative">

            {/* 🟢 MENSAJE ACCESIBLE */}
           <div aria-live="polite"
            className="mb-4 px-4 py-3 rounded-xl bg-surface-container-high text-on-surface text-center font-bold shadow-md border border-outline min-h-[52px] flex items-center justify-center"
>
             {mensajeAccesible || ' '}
            </div>

            <div className="w-full flex justify-between items-end mb-8 md:hidden">
                <div>
                   <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2 inline-block">
                        {difficulty === 'EASY' ? t[lang].easy : difficulty === 'MEDIUM' ? t[lang].medium : t[lang].hard} {t[lang].difficultyLabel}
                   </span>
                   <h2 className="text-2xl font-bold tracking-tight text-primary">{t[lang].appTitle}</h2>
                </div>
                 <div className="text-right">
                   <p className="text-[10px] uppercase tracking-widest text-outline font-bold">{t[lang].session}</p>
                   <p className="text-lg font-black tracking-tight">{String(Math.floor(timeElapsed / 60)).padStart(2, '0')}:{String(timeElapsed % 60).padStart(2, '0')}</p>
                </div>
            </div>

            <div className="md:hidden grid grid-cols-3 gap-3 mb-8 w-full max-w-md">
                <div className="bg-surface-container-high p-4 rounded-xl flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">{t[lang].timeElapsed}</span>
                    <span className="text-xl font-bold">{String(Math.floor(timeElapsed / 60)).padStart(2, '0')}:{String(timeElapsed % 60).padStart(2, '0')}</span>
                </div>
                <div className="bg-surface-container-high p-4 rounded-xl flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">{t[lang].moves}</span>
                    <span className="text-xl font-bold">{moves}</span>
                </div>
                <div className="bg-surface-container-high p-4 rounded-xl flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase tracking-widest text-outline font-bold mb-1">{t[lang].pairs}</span>
                    <span className="text-xl font-bold">{pairsFound}/{config.pairs}</span>
                </div>
            </div>

            <div className={`w-full flex-1 glass-panel p-4 sm:p-6 md:p-10 rounded-3xl relative z-10 flex items-center justify-center min-h-[400px] mb-8 md:mb-0`}>
                <div className={`grid ${config.class} gap-4 md:gap-6 place-content-center w-full relative z-10 mx-auto`}>
                    {cards.map((card, idx) => (
                        <div 
                            key={card.id}
                            onClick={() => handleCardClick(idx)}

                            role="button"
                            tabIndex={0}
                            aria-label={
                                card.isMatched
                                    ? `Carta emparejada con ${card.icon}`
                                    : card.isFlipped
                                        ? `Carta con ${card.icon}`
                                        : 'Carta oculta'
                            }
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleCardClick(idx);
                                }
                            }}

                            className={`aspect-square sm:aspect-auto sm:min-h-[140px] md:min-h-[180px] lg:min-h-[220px] xl:min-h-[240px] rounded-2xl md:rounded-[1.25rem] cursor-pointer transition-all duration-300 relative transform-gpu hover:scale-[1.02] active:scale-95 overflow-hidden group focus:outline-none focus:ring-4 focus:ring-accent ${
                                card.isMatched 
                                    ? 'bg-gradient-to-br from-accent to-orange-600 text-white shadow-lg shadow-accent/20 ring-1 ring-white/20' 
                                    : card.isFlipped 
                                        ? 'bg-gradient-to-br from-primary to-blue-700 text-white shadow-xl ring-1 ring-white/20' 
                                        : 'bg-blue-50/80 dark:bg-blue-950/40 border-2 border-blue-400/60 dark:border-blue-500/50 shadow-md hover:border-blue-500 hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] hover:-translate-y-1'
                            }`}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                               {(card.isFlipped || card.isMatched) ? (
                                    <span className={`material-symbols-outlined text-5xl md:text-7xl drop-shadow-md ${card.isMatched ? 'filled text-white' : 'text-white animate-in fade-in zoom-in duration-200'}`}>
                                        {card.icon}
                                    </span>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-4xl md:text-6xl text-blue-500/30 group-hover:text-blue-500/50 transition-colors">architecture</span>
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_100%)]"></div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="hidden md:flex mt-12 glass-panel p-6 rounded-2xl items-center gap-4 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="p-3 bg-gradient-to-br from-accent to-orange-500 rounded-xl shadow-lg shadow-accent/20">
                    <span className="material-symbols-outlined text-white">lightbulb</span>
                </div>
                <div className="relative z-10 w-full">
                    <p className="text-[13px] font-bold text-primary mb-0.5 tracking-wide uppercase">{t[lang].quickHint}</p>
                    <p className="text-sm text-on-surface-variant font-medium">{t[lang].hintText}</p>
                </div>
            </div>

        </main>
    );
}