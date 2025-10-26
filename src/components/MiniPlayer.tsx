import { Play, Pause, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MiniPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  onVolumeClick: () => void;
  show: boolean;
}

export function MiniPlayer({ isPlaying, onToggle, onVolumeClick, show }: MiniPlayerProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed bottom-0 left-0 right-0 h-14 bg-[var(--c-bg)]/95 backdrop-blur-md border-t border-[var(--c-ink-dim)]/20 z-50"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="max-w-screen-md mx-auto h-full px-4 flex items-center justify-between gap-4">
            <button
              onClick={onToggle}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--c-accent)] hover:scale-105 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-offset-2 focus:ring-offset-[var(--c-bg)] shadow-md shadow-[var(--c-accent)]/30"
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-[var(--c-bg)] fill-[var(--c-bg)]" />
              ) : (
                <Play className="w-5 h-5 text-[var(--c-bg)] fill-[var(--c-bg)] ml-0.5" />
              )}
            </button>
            
            <div className="flex-1 min-w-0 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--c-accent-yellow)] animate-pulse" />
              <span className="truncate text-sm tracking-wide">Bahia Surfers Radio · En vivo</span>
            </div>
            
            <button
              onClick={onVolumeClick}
              className="flex-shrink-0 w-10 h-10 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-offset-2 focus:ring-offset-[var(--c-bg)]"
              aria-label="Control de volumen"
            >
              <Volume2 className="w-5 h-5 text-[var(--c-ink-dim)]" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
