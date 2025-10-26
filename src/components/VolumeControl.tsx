import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Slider } from './ui/slider';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number) => void;
  show: boolean;
  onClose: () => void;
}

export function VolumeControl({ volume, onVolumeChange, show, onClose }: VolumeControlProps) {
  const isMuted = volume === 0;

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-20 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 w-64 p-4 bg-[var(--c-bg)]/95 backdrop-blur-md border border-[var(--c-ink-dim)]/20 rounded-2xl shadow-2xl z-50"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => onVolumeChange(isMuted ? 0.7 : 0)}
                className="flex-shrink-0 w-10 h-10 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)]"
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-[var(--c-ink-dim)]" />
                ) : (
                  <Volume2 className="w-5 h-5 text-[var(--c-accent)]" />
                )}
              </button>
              
              <div className="flex-1">
                <Slider
                  value={[volume * 100]}
                  onValueChange={(value) => onVolumeChange(value[0] / 100)}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                  aria-label="Control de volumen"
                />
              </div>
              
              <span className="flex-shrink-0 w-10 text-sm text-[var(--c-ink-dim)] text-right">
                {Math.round(volume * 100)}
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
