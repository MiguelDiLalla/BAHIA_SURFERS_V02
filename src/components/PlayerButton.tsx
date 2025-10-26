import { Play, Pause, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PlayerButtonProps {
  isPlaying: boolean;
  isConnecting: boolean;
  onToggle: () => void;
}

export function PlayerButton({ isPlaying, isConnecting, onToggle }: PlayerButtonProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <motion.button
        onClick={onToggle}
        className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[var(--c-accent)] via-[var(--c-accent)] to-[var(--c-accent-2)] hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-offset-2 focus:ring-offset-[var(--c-bg)] shadow-lg shadow-[var(--c-accent)]/20"
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
      >
        {isConnecting ? (
          <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-[var(--c-bg)] animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-10 h-10 md:w-12 md:h-12 text-[var(--c-bg)] fill-[var(--c-bg)]" />
        ) : (
          <Play className="w-10 h-10 md:w-12 md:h-12 text-[var(--c-bg)] fill-[var(--c-bg)] ml-1" />
        )}
        
        {isPlaying && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-1 -right-1 flex items-center gap-1.5 bg-[var(--c-accent-yellow)] px-2.5 py-1 rounded-full shadow-md"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--c-bg)] animate-pulse" />
            <span className="text-xs tracking-wider text-[var(--c-bg)] uppercase">Live</span>
          </motion.div>
        )}
      </motion.button>
      
      <div className="text-center">
        {isConnecting ? (
          <p className="text-[var(--c-ink-dim)]">Conectando…</p>
        ) : isPlaying ? (
          <div className="space-y-1">
            <p className="tracking-wide">Bahia Surfers Radio</p>
            <p className="text-sm text-[var(--c-ink-dim)]">En vivo · Classic Rock & Reggae</p>
          </div>
        ) : (
          <p className="text-[var(--c-ink-dim)]">Sonido en directo</p>
        )}
      </div>
    </div>
  );
}
