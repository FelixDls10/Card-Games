import { Gamepad2, BarChart2, Settings } from 'lucide-react';
import { t } from '../i18n.js';

export function BottomNav({ lang }) {
  const tx = t[lang];
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface-container-lowest border-t border-surface-container-highest shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
      <div className="flex justify-around items-center h-20 px-4">
        <button className="flex flex-col items-center justify-center text-outline hover:text-primary transition-all active:opacity-80">
          <Gamepad2 size={22} />
          <span className="text-[10px] font-medium tracking-[0.05em] uppercase mt-1">{tx.playTab}</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-accent text-on-accent rounded-xl px-6 py-2 shadow-lg shadow-accent/20 active:scale-95 transition-all">
          <BarChart2 size={22} />
          <span className="text-[10px] font-bold tracking-[0.05em] uppercase mt-1">{tx.gameStats.substring(0, 5)}</span>
        </button>
        <button className="flex flex-col items-center justify-center text-outline hover:text-primary transition-all active:opacity-80">
          <Settings size={22} />
          <span className="text-[10px] font-medium tracking-[0.05em] uppercase mt-1">{tx.settings}</span>
        </button>
      </div>
    </nav>
  );
}
