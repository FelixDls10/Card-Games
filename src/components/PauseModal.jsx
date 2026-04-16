import { Pause, Play, RotateCcw, SlidersHorizontal, LogOut, ChevronRight, X } from 'lucide-react';
import { t } from '../i18n.js';

export function PauseModal({ onResume, onRestart, onChangeDifficulty, onExit, lang }) {
  const tx = t[lang];
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-surface/80 backdrop-blur-md p-6">
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-[2rem] shadow-[0px_24px_48px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col border border-outline-variant/20">
        <div className="pt-10 pb-6 px-8 text-center">
          <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-6">
            <Pause size={28} className="text-primary" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-primary mb-2">{tx.pauseTitle}</h2>
          <p className="text-sm text-outline font-bold uppercase tracking-wider">{tx.archMode}</p>
        </div>

        <div className="px-8 pb-10 flex flex-col gap-3">
          <button onClick={onResume} className="w-full h-14 bg-accent text-on-accent font-bold tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 shadow-lg shadow-accent/20 active:scale-95 transition-all">
            <Play size={18} className="fill-current" />
            {tx.resume}
          </button>
          <button onClick={onRestart} className="w-full h-14 bg-surface-container-lowest border-2 border-surface-container-highest text-primary font-bold tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-low active:scale-95 transition-all">
            <RotateCcw size={18} />
            {tx.restart}
          </button>

          <div className="h-px w-full bg-surface-container-highest my-4" />

          <button onClick={onChangeDifficulty} className="w-full h-12 text-on-surface-variant font-medium rounded-lg flex items-center justify-between px-4 hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-3">
              <SlidersHorizontal size={16} />
              <span>{tx.changeDifficulty}</span>
            </div>
            <ChevronRight size={16} className="text-outline" />
          </button>

          <button onClick={onExit} className="w-full h-12 text-error font-medium rounded-lg flex items-center justify-between px-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group">
            <div className="flex items-center gap-3">
              <LogOut size={16} />
              <span>{tx.exitMenu}</span>
            </div>
            <X size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
}
