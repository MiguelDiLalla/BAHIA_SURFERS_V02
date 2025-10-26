import { useState, useRef, useEffect } from 'react';
import { PlayerButton } from './components/PlayerButton';
import { MiniPlayer } from './components/MiniPlayer';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { ScrollingMessage } from './components/ScrollingMessage';
import { SocialLinks } from './components/SocialLinks';
import { SponsorLink } from './components/SponsorLink';
import { VolumeControl } from './components/VolumeControl';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';
import logoFullColor from './assets/logo_fullcolor.webp';
import backgroundImage from './assets/BahiaFM_Color_background.webp';
import sponsorLogo from './assets/SurfFactory_PT.webp';

const STREAM_URL = 'https://sonic2.sistemahost.es/8110/stream';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // PWA service worker is now automatically registered by vite-plugin-pwa

    // Set initial volume
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setShowMiniPlayer(false);
    } else {
      try {
        setIsConnecting(true);
        audioRef.current.load();
        await audioRef.current.play();
        setIsPlaying(true);
        setIsConnecting(false);
        setShowMiniPlayer(true);
      } catch (error) {
        console.error('Playback error:', error);
        setIsConnecting(false);
        toast.error('No se puede reproducir ahora. Inténtalo de nuevo.');
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleVolumeClick = () => {
    setShowVolumeControl(!showVolumeControl);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--c-bg)]" />
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 py-8 md:py-16 max-w-screen-md mx-auto w-full relative z-10">
        {/* Header */}
        <header className="w-full flex flex-col items-center gap-6 mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-4 w-full">
            <img
              src={logoFullColor}
              alt="Bahia Surfers Radio"
              className="h-24 md:h-32 w-auto object-contain max-h-28"
            />
          </div>
          <p className="text-center text-[var(--c-ink-dim)] max-w-lg text-sm md:text-base px-4">
            Radio Musical para amantes del Surf, el Skate, la Playa y los
            Deportes extremos
          </p>
        </header>

        {/* PWA Install Button - Above Player */}
        <div className="mb-12">
          <PWAInstallPrompt isPlaying={isPlaying} />
        </div>

        {/* Hero Player */}
        <div className="mb-8">
          <PlayerButton
            isPlaying={isPlaying}
            isConnecting={isConnecting}
            onToggle={handlePlayPause}
          />
        </div>

        {/* Scrolling Messages */}
        <div className="mb-12">
          <ScrollingMessage isPlaying={isPlaying} />
        </div>

        {/* Social Links */}
        <div className="mb-8">
          <SocialLinks />
        </div>

        {/* Sponsor Link */}
        <div className="mb-8">
          <SponsorLink
            name="SurfFactory.pt"
            url="https://www.surfactory.pt/"
            logoUrl={sponsorLogo}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-screen-md mx-auto px-4 py-6 text-center text-xs text-[var(--c-ink-dim)] border-t border-[var(--c-ink-dim)]/10">
        <p>
          © {new Date().getFullYear()} Bahia Surfers Radio ·{' '}
          <a
            href="mailto:contacto@bahiasurfersradio.com"
            className="hover:text-[var(--c-accent)] transition-colors"
          >
            contacto@bahiasurfersradio.com
          </a>
        </p>
      </footer>

      {/* Audio Element */}
      <audio ref={audioRef} crossOrigin="anonymous" preload="none">
        <source src={STREAM_URL} type="audio/mpeg" />
      </audio>

      {/* Mini Player */}
      <MiniPlayer
        isPlaying={isPlaying}
        onToggle={handlePlayPause}
        onVolumeClick={handleVolumeClick}
        show={showMiniPlayer}
      />

      {/* Volume Control */}
      <VolumeControl
        volume={volume}
        onVolumeChange={handleVolumeChange}
        show={showVolumeControl}
        onClose={() => setShowVolumeControl(false)}
      />

      {/* Toast Container */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--c-bg)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--c-ink)',
          },
        }}
      />
    </div>
  );
}
