import { useState, useEffect } from 'react';
import { Difficulty, GameState, GameMetrics } from './types';
import { Language } from './i18n';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { GameScreen } from './components/screens/GameScreen';
import { VictoryScreen } from './components/screens/VictoryScreen';
import { PauseModal } from './components/PauseModal';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('HOME');
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [metrics, setMetrics] = useState<GameMetrics>({ timeElapsed: 0, moves: 0, pairsFound: 0 });
  const [sessionId, setSessionId] = useState<string>('ARCH-001');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState<Language>('es');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleStartGame = () => {
    setSessionId(`ARCH-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`);
    setGameState('PLAYING');
  };

  const handleVictory = (finalMetrics: GameMetrics) => {
    setMetrics(finalMetrics);
    setGameState('VICTORY');
  };

  const handlePause = () => setGameState('PAUSED');
  const handleResume = () => setGameState('PLAYING');
  const handleRestart = () => {
     setGameState('HOME');
     setTimeout(() => handleStartGame(), 50); // slight delay to force remount
  };
  const handleExit = () => setGameState('HOME');

  return (
    <div className="flex bg-surface min-h-screen text-on-surface font-sans overflow-x-hidden selection:bg-primary/20 selection:text-primary relative selection:bg-primary/20">
      {/* Ambient background glow for high-end look */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,var(--theme-primary)_0%,transparent_50%)] opacity-[0.03] dark:opacity-[0.08] z-0"></div>
      
      <div className="flex w-full relative z-10">
          <Sidebar 
              state={gameState} 
              onNewGame={handleStartGame} 
              onExit={handleExit} 
              metrics={metrics}
              difficulty={difficulty}
              lang={lang}
          />
          <Header 
              state={gameState} 
              sessionId={sessionId} 
              onPause={handlePause}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              lang={lang}
              setLang={setLang}
          />
          
          {/* Main content wrapper */}
          <div className="flex-1 flex flex-col md:ml-[300px] min-h-screen relative w-full pt-16">
              {gameState === 'HOME' && (
              <HomeScreen 
                  onStart={handleStartGame} 
                  difficulty={difficulty} 
                  setDifficulty={setDifficulty} 
                  lang={lang}
              />
          )}

          {(gameState === 'PLAYING' || gameState === 'PAUSED') && (
              <GameScreen 
                  difficulty={difficulty} 
                  onVictory={handleVictory}
                  setMetrics={setMetrics}
                  lang={lang}
              />
          )}

          {gameState === 'VICTORY' && (
              <VictoryScreen 
                  metrics={metrics}
                  onRestart={handleRestart}
                  onHome={handleExit}
                  lang={lang}
              />
          )}
          </div>
      </div>

      {gameState === 'PAUSED' && (
          <PauseModal 
              onResume={handleResume}
              onRestart={handleRestart}
              onChangeDifficulty={() => setGameState('HOME')}
              onExit={handleExit}
              lang={lang}
          />
      )}

      <BottomNav lang={lang} />
    </div>
  );
}
