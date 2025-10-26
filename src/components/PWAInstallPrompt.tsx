/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { X, Download, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallPromptProps {
  isPlaying?: boolean;
}

type DeviceType = 'ios' | 'android' | 'desktop';

export function PWAInstallPrompt({ isPlaying = false }: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showAndroidPrompt, setShowAndroidPrompt] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [showChip, setShowChip] = useState(false);
  const [showingIOSInstructions, setShowingIOSInstructions] = useState(false);
  const [detectedDevice, setDetectedDevice] = useState<DeviceType>('desktop');

  useEffect(() => {
    console.log('🔍 PWA Install: Starting detection...');

    // Detect device type
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isAndroid = /android/i.test(navigator.userAgent);

    if (isIOS) {
      setDetectedDevice('ios');
    } else if (isAndroid) {
      setDetectedDevice('android');
    } else {
      setDetectedDevice('desktop');
    }

    // Check if already installed
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    console.log(
      '📱 Display mode:',
      window.matchMedia('(display-mode: standalone)').matches
        ? 'standalone'
        : 'browser'
    );
    console.log('🏠 Is installed:', isStandalone);

    // Don't show if already installed as PWA
    if (isStandalone) {
      console.log('✅ Already installed, hiding button');
      return;
    }

    // Show chip immediately (will work on all browsers)
    console.log('✨ Showing install button');
    setShowChip(true);

    // Android - handle beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('🤖 Android install prompt event received');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    console.log('🍎 Is iOS:', isIOS);
    console.log('🌐 User Agent:', navigator.userAgent);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleAndroidInstall = async () => {
    console.log('📱 Fallback install clicked');
    if (!deferredPrompt) {
      console.log(
        '⚠️ No deferred prompt available - showing browser instructions'
      );
      // If no prompt available, just close the dialog
      // User needs to use browser's own "Install" option
      setShowAndroidPrompt(false);
      return;
    }

    console.log('🚀 Triggering deferred prompt from dialog');
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    console.log('✅ Install outcome:', outcome);
    if (outcome === 'accepted') {
      console.log('🎉 PWA installed successfully');
    }

    setShowAndroidPrompt(false);
    setShowChip(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowAndroidPrompt(false);
    setShowIOSPrompt(false);
    setShowingIOSInstructions(false);
  };

  const handleChipClick = async () => {
    /* eslint-disable no-console */
    console.log('🖱️ Install button clicked');
    const userIsIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    console.log('🍎 Is iOS on click:', userIsIOS);
    console.log('📦 Has deferred prompt:', !!deferredPrompt);

    // iOS: Show instructions banner
    if (userIsIOS) {
      console.log('📱 Showing iOS instructions banner');
      setShowingIOSInstructions(true);
      setShowIOSPrompt(true);
      return;
    }

    // Android/Desktop: Show banner (not native prompt directly)
    console.log('📱 Showing Android/Desktop install banner');
    setShowingIOSInstructions(false);
    setShowAndroidPrompt(true);
    /* eslint-enable no-console */
  };
  return (
    <>
      <style>{`
        .pwa-install-button {
          background-color: #06b6d4 !important;
          border-color: #67e8f9 !important;
          color: #000000 !important;
          font-weight: 700 !important;
          padding: 1.25rem 2.5rem !important;
        }
        .pwa-install-button:hover {
          background-color: #22d3ee !important;
        }
      `}</style>

      {/* Install Chip */}
      <AnimatePresence>
        {showChip && !showAndroidPrompt && !showIOSPrompt && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={handleChipClick}
            style={{
              backgroundColor: '#06b6d4',
              borderColor: '#67e8f9',
              color: '#000000',
              boxShadow:
                '0 10px 25px -5px rgba(6, 182, 212, 0.5), 0 8px 10px -6px rgba(6, 182, 212, 0.3)',
            }}
            className="pwa-install-button inline-flex items-center gap-4 px-10 py-5 rounded-full border-2 transition-all duration-200 text-base font-bold focus:outline-none focus:ring-4 focus:ring-cyan-300 hover:scale-105 active:scale-95"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#22d3ee';
              e.currentTarget.style.boxShadow =
                '0 20px 35px -5px rgba(6, 182, 212, 0.6), 0 10px 15px -6px rgba(6, 182, 212, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#06b6d4';
              e.currentTarget.style.boxShadow =
                '0 10px 25px -5px rgba(6, 182, 212, 0.5), 0 8px 10px -6px rgba(6, 182, 212, 0.3)';
            }}
          >
            <Download className="w-5 h-5" />
            <span>Instalar en Home</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Android Prompt */}
      <AnimatePresence>
        {showAndroidPrompt && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={handleDismiss}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed left-0 right-0 bg-[var(--c-bg)] rounded-t-3xl p-6 pb-8 z-50 shadow-2xl max-w-screen-md mx-auto"
              style={{
                bottom: isPlaying ? '3.5rem' : '0',
                paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))',
              }}
            >
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)]"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-[var(--c-ink-dim)]" />
              </button>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--c-accent)] via-[var(--c-accent)] to-[var(--c-accent-2)] flex items-center justify-center shadow-lg shadow-[var(--c-accent)]/20">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowingIOSInstructions(true)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        detectedDevice === 'ios'
                          ? 'bg-gradient-to-br from-[var(--c-accent)] via-[var(--c-accent)] to-[var(--c-accent-2)] shadow-lg shadow-[var(--c-accent)]/20'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      title="Ver iOS"
                    >
                      <i
                        className={`fa-brands fa-apple text-xl ${
                          detectedDevice === 'ios'
                            ? 'text-white'
                            : 'text-[var(--c-ink-dim)]'
                        }`}
                      ></i>
                    </button>
                    <button
                      onClick={() => setShowingIOSInstructions(false)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        detectedDevice === 'android'
                          ? 'bg-gradient-to-br from-[var(--c-accent)] via-[var(--c-accent)] to-[var(--c-accent-2)] shadow-lg shadow-[var(--c-accent)]/20'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      title="Ver Android"
                    >
                      <i
                        className={`fa-brands fa-android text-xl ${
                          detectedDevice === 'android'
                            ? 'text-white'
                            : 'text-[var(--c-ink-dim)]'
                        }`}
                      ></i>
                    </button>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        detectedDevice === 'desktop'
                          ? 'bg-gradient-to-br from-[var(--c-accent)] via-[var(--c-accent)] to-[var(--c-accent-2)] shadow-lg shadow-[var(--c-accent)]/20'
                          : 'bg-white/10'
                      }`}
                      title="Desktop"
                    >
                      <i
                        className={`fa-solid fa-desktop text-base ${
                          detectedDevice === 'desktop'
                            ? 'text-white'
                            : 'text-[var(--c-ink-dim)]'
                        }`}
                      ></i>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="tracking-wide">
                    Bahia Surfers Radio como app
                  </h3>
                  <p className="text-[var(--c-ink-dim)]">
                    {showingIOSInstructions
                      ? 'Añádela a tu pantalla de inicio para entrar con un toque.'
                      : 'Instala la app para escuchar más rápido y sin pestañas.'}
                  </p>
                </div>

                {showingIOSInstructions ? (
                  <div className="space-y-3 p-4 rounded-xl bg-white/5">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--c-accent)]/20 flex items-center justify-center text-xs text-[var(--c-accent)]">
                        1
                      </div>
                      <div className="flex-1 text-sm text-[var(--c-ink-dim)]">
                        Toca el botón <Share className="inline w-4 h-4 mx-1" />{' '}
                        de compartir
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--c-accent)]/20 flex items-center justify-center text-xs text-[var(--c-accent)]">
                        2
                      </div>
                      <div className="flex-1 text-sm text-[var(--c-ink-dim)]">
                        Selecciona &quot;Añadir a pantalla de inicio&quot;
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleAndroidInstall}
                      className="flex-1 h-11 rounded-xl bg-[var(--c-accent)] hover:scale-105 transition-all text-white focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-offset-2 focus:ring-offset-[var(--c-bg)] shadow-lg shadow-[var(--c-accent)]/30"
                    >
                      Instalar
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="flex-1 h-11 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-[var(--c-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-offset-2 focus:ring-offset-[var(--c-bg)]"
                    >
                      Ahora no
                    </button>
                  </div>
                )}
                <button
                  onClick={handleDismiss}
                  className="w-full h-11 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-[var(--c-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-offset-2 focus:ring-offset-[var(--c-bg)] mt-2"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* iOS Prompt */}
      <AnimatePresence>
        {showIOSPrompt && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={handleDismiss}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed left-0 right-0 bg-[var(--c-bg)] rounded-t-3xl p-6 pb-8 z-50 shadow-2xl max-w-screen-md mx-auto"
              style={{
                bottom: isPlaying ? '3.5rem' : '0',
                paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))',
              }}
            >
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)]"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-[var(--c-ink-dim)]" />
              </button>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--c-accent)] via-[var(--c-accent)] to-[var(--c-accent-2)] flex items-center justify-center shadow-lg shadow-[var(--c-accent)]/20">
                    <Share className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowingIOSInstructions(true)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        detectedDevice === 'ios'
                          ? 'bg-gradient-to-br from-[var(--c-accent)] via-[var(--c-accent)] to-[var(--c-accent-2)] shadow-lg shadow-[var(--c-accent)]/20'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      title="Ver iOS"
                    >
                      <i
                        className={`fa-brands fa-apple text-xl ${
                          detectedDevice === 'ios'
                            ? 'text-white'
                            : 'text-[var(--c-ink-dim)]'
                        }`}
                      ></i>
                    </button>
                    <button
                      onClick={() => setShowingIOSInstructions(false)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        detectedDevice === 'android'
                          ? 'bg-gradient-to-br from-[var(--c-accent)] via-[var(--c-accent)] to-[var(--c-accent-2)] shadow-lg shadow-[var(--c-accent)]/20'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      title="Ver Android"
                    >
                      <i
                        className={`fa-brands fa-android text-xl ${
                          detectedDevice === 'android'
                            ? 'text-white'
                            : 'text-[var(--c-ink-dim)]'
                        }`}
                      ></i>
                    </button>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        detectedDevice === 'desktop'
                          ? 'bg-gradient-to-br from-[var(--c-accent)] via-[var(--c-accent)] to-[var(--c-accent-2)] shadow-lg shadow-[var(--c-accent)]/20'
                          : 'bg-white/10'
                      }`}
                      title="Desktop"
                    >
                      <i
                        className={`fa-solid fa-desktop text-base ${
                          detectedDevice === 'desktop'
                            ? 'text-white'
                            : 'text-[var(--c-ink-dim)]'
                        }`}
                      ></i>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="tracking-wide">
                    Bahia Surfers Radio como app
                  </h3>
                  <p className="text-[var(--c-ink-dim)]">
                    {showingIOSInstructions
                      ? 'Añádela a tu pantalla de inicio para entrar con un toque.'
                      : 'Instala la app para escuchar más rápido y sin pestañas.'}
                  </p>
                </div>

                {showingIOSInstructions ? (
                  <div className="space-y-3 p-4 rounded-xl bg-white/5">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--c-accent)]/20 flex items-center justify-center text-xs text-[var(--c-accent)]">
                        1
                      </div>
                      <div className="flex-1 text-sm text-[var(--c-ink-dim)]">
                        Toca el botón <Share className="inline w-4 h-4 mx-1" />{' '}
                        de compartir
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--c-accent)]/20 flex items-center justify-center text-xs text-[var(--c-accent)]">
                        2
                      </div>
                      <div className="flex-1 text-sm text-[var(--c-ink-dim)]">
                        Selecciona &quot;Añadir a pantalla de inicio&quot;
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleAndroidInstall}
                      className="flex-1 h-11 rounded-xl bg-[var(--c-accent)] hover:scale-105 transition-all text-white focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-offset-2 focus:ring-offset-[var(--c-bg)] shadow-lg shadow-[var(--c-accent)]/30"
                    >
                      Instalar
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="flex-1 h-11 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-[var(--c-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-offset-2 focus:ring-offset-[var(--c-bg)]"
                    >
                      Ahora no
                    </button>
                  </div>
                )}

                <button
                  onClick={handleDismiss}
                  className="w-full h-11 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-[var(--c-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-offset-2 focus:ring-offset-[var(--c-bg)]"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
