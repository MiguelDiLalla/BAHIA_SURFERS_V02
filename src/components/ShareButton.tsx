import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

/**
 * ShareButton Component
 *
 * Displays a share button that opens a modal with multiple sharing options.
 * Follows the same visual style as PWAInstallPrompt for consistency.
 *
 * Features:
 * - Multi-platform sharing (WhatsApp, Twitter, Telegram, Email, Instagram)
 * - Copy link functionality with feedback ("¡Copiado! Gracias.")
 * - Click-outside-to-close behavior
 * - Frosted backdrop effect
 * - Cyan glow on button, dark blue panel with yellow text
 * - Yellow separators between options
 * - All share links open in new tabs
 *
 * Design:
 * - Button: Cyan (#06b6d4) with hover effects, matching PWA install button
 * - Panel: Dark blue (#1e3a5f) background with cyan glow
 * - Text: Yellow (#fbbf24) for high contrast
 * - Separators: Semi-transparent yellow lines
 *
 * @example
 * ```tsx
 * <ShareButton />
 * ```
 */

interface ShareOption {
  name: string;
  icon: string;
  action: () => void;
  isSpecial?: boolean; // For copy link that changes text
}

export function ShareButton() {
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState('Copiar enlace');

  // Get current URL and share data
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = 'Bahia Surfers Radio';
  const shareDescription =
    'Radio Musical para amantes del Surf, el Skate, la Playa y los Deportes extremos';

  /**
   * Handles copying URL to clipboard
   * Changes button text to "¡Copiado! Gracias." for user feedback
   * Resets text after 3 seconds
   */
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyButtonText('¡Copiado! Gracias.');
      toast.success('Enlace copiado al portapapeles');

      // Reset text after 3 seconds
      setTimeout(() => {
        setCopyButtonText('Copiar enlace');
      }, 3000);
    } catch (error) {
      toast.error('No se pudo copiar el enlace');
      console.error('Copy failed:', error);
    }
  };

  /**
   * Share options configuration
   * Each option opens in a new tab or performs a specific action
   * URLs are dynamically built using current page information
   */
  const shareOptions: ShareOption[] = [
    {
      name: 'WhatsApp',
      icon: 'fa-brands fa-whatsapp',
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            `${shareDescription} ${shareUrl}`
          )}`,
          '_blank',
          'noopener,noreferrer'
        );
      },
    },
    {
      name: 'Twitter',
      icon: 'fa-brands fa-twitter',
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareDescription
          )}&url=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'noopener,noreferrer'
        );
      },
    },
    {
      name: 'Telegram',
      icon: 'fa-brands fa-telegram',
      action: () => {
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(shareDescription)}`,
          '_blank',
          'noopener,noreferrer'
        );
      },
    },
    {
      name: 'Email',
      icon: 'fa-solid fa-envelope',
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(
          shareTitle
        )}&body=${encodeURIComponent(`${shareDescription}\n\n${shareUrl}`)}`;
      },
    },
    {
      name: copyButtonText,
      icon: 'fa-solid fa-link',
      action: handleCopyLink,
      isSpecial: true,
    },
    {
      name: 'Instagram',
      icon: 'fa-brands fa-instagram',
      action: () => {
        handleCopyLink();
        toast.info('Pega el enlace en tu historia o bio de Instagram', {
          duration: 4000,
        });
      },
    },
  ];

  const handleShareClick = () => {
    setShowSharePanel(true);
  };

  const handleDismiss = () => {
    setShowSharePanel(false);
  };

  return (
    <>
      <style>{`
        .share-button {
          background-color: #06b6d4 !important;
          border-color: #67e8f9 !important;
          color: #000000 !important;
          font-weight: 700 !important;
          padding: 1.25rem 2.5rem !important;
        }
        .share-button:hover {
          background-color: #22d3ee !important;
        }
      `}</style>

      {/* Share Button - Matching PWA Install Button Style */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={handleShareClick}
        style={{
          backgroundColor: '#06b6d4',
          borderColor: '#67e8f9',
          color: '#000000',
          boxShadow:
            '0 10px 25px -5px rgba(6, 182, 212, 0.5), ' +
            '0 8px 10px -6px rgba(6, 182, 212, 0.3)',
        }}
        className="share-button inline-flex items-center gap-4 px-10 py-5 rounded-full
          border-2 transition-all duration-200 text-base font-bold
          focus:outline-none focus:ring-4 focus:ring-cyan-300
          hover:scale-105 active:scale-95"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#22d3ee';
          e.currentTarget.style.boxShadow =
            '0 20px 35px -5px rgba(6, 182, 212, 0.6), ' +
            '0 10px 15px -6px rgba(6, 182, 212, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#06b6d4';
          e.currentTarget.style.boxShadow =
            '0 10px 25px -5px rgba(6, 182, 212, 0.5), ' +
            '0 8px 10px -6px rgba(6, 182, 212, 0.3)';
        }}
        aria-label="Compartir Bahia Surfers Radio"
      >
        <Share2 className="w-5 h-5" />
        <span>Compartir</span>
      </motion.button>

      {/* Share Panel Modal */}
      <AnimatePresence>
        {showSharePanel && (
          <>
            {/* Frosted Backdrop - Same as PWA Install */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={handleDismiss}
              aria-label="Cerrar panel de compartir"
            />

            {/* Share Panel - Dark Blue with Cyan Glow - AUMENTADO 150% */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
              transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              style={{
                position: 'fixed',
                left: '50%',
                top: '50%',
                width: '54%',
                maxWidth: '16.5rem',
                backgroundColor: '#1e3a5f',
                boxShadow:
                  '0 0 45px rgba(6, 182, 212, 0.4), ' +
                  '0 15px 37px -7px rgba(0, 0, 0, 0.3)',
                borderRadius: '0.9rem',
                padding: '0.9rem',
                zIndex: 50,
              }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="share-panel-title"
            >
              {/* Header */}
              <div style={{ marginBottom: '0.75rem' }}>
                <h3
                  id="share-panel-title"
                  style={{
                    color: '#fbbf24',
                    fontSize: '0.825rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '0',
                  }}
                >
                  Compartir Bahia Surfers Radio
                </h3>
              </div>

              {/* Share Options */}
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
                role="list"
              >
                {shareOptions.map((option, index) => (
                  <div key={option.icon} role="listitem">
                    <button
                      onClick={() => {
                        option.action();
                        // Don't close panel immediately for copy actions
                        // so user sees the feedback
                        if (!option.isSpecial) {
                          setTimeout(() => setShowSharePanel(false), 300);
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '0.525rem 0.6rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          'rgba(255, 255, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      aria-label={`Compartir en ${option.name}`}
                    >
                      {/* Icon Container */}
                      <div
                        style={{
                          width: '1.5rem',
                          height: '1.5rem',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(6, 182, 212, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <i
                          className={option.icon}
                          style={{ color: '#06b6d4', fontSize: '0.75rem' }}
                          aria-hidden="true"
                        ></i>
                      </div>

                      {/* Option Text */}
                      <span
                        style={{
                          color: '#fbbf24',
                          fontSize: '0.675rem',
                          fontWeight: '500',
                        }}
                      >
                        {option.name}
                      </span>
                    </button>

                    {/* Yellow Separator (except after last item) */}
                    {index < shareOptions.length - 1 && (
                      <div
                        style={{
                          height: '1px',
                          backgroundColor: '#fbbf24',
                          opacity: 0.3,
                          margin: '0 0.6rem',
                        }}
                        aria-hidden="true"
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                style={{
                  width: '100%',
                  marginTop: '0.75rem',
                  height: '1.875rem',
                  borderRadius: '0.45rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#fbbf24',
                  fontSize: '0.675rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Cerrar panel de compartir"
              >
                Cerrar
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
