import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { scrollingData } from '../data/scrolling-text';

interface ScrollingMessageProps {
  isPlaying: boolean;
}

export function ScrollingMessage({ isPlaying }: ScrollingMessageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const { messages, config } = scrollingData;
  const { fadeDuration, messageDisplay, delayBeforeStart } = config;

  useEffect(() => {
    if (!isPlaying) {
      setIsVisible(false);
      return;
    }

    // Initial delay before first message
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, delayBeforeStart);

    return () => clearTimeout(initialTimeout);
  }, [isPlaying, delayBeforeStart]);

  useEffect(() => {
    if (!isPlaying || !isVisible) return;

    const cycleInterval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // Wait for fade out, then change message and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, fadeDuration);
    }, messageDisplay + fadeDuration * 2);

    return () => clearInterval(cycleInterval);
  }, [isPlaying, isVisible, messages.length, messageDisplay, fadeDuration]);

  if (!isPlaying) return null;

  return (
    <div className="min-h-12 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: fadeDuration / 1000 }}
            className="text-sm text-[var(--c-ink-dim)] text-center px-4 max-w-2xl leading-relaxed"
          >
            {messages[currentIndex]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
