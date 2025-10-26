import { ExternalLink } from 'lucide-react';

interface SponsorLinkProps {
  name: string;
  url: string;
  logoUrl?: string;
}

export function SponsorLink({ name, url, logoUrl }: SponsorLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 h-11 px-1 hover:opacity-100 opacity-80 transition-opacity group focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] rounded-lg"
      aria-label={`Patrocinado por ${name}, abre en una nueva pestaña`}
    >
      <span className="text-sm text-[var(--c-ink-dim)]">Patrocinado por</span>

      {logoUrl ? (
        <img
          src={logoUrl}
          alt={name}
          className="h-12 md:h-14 object-contain"
          style={{ filter: 'brightness(0) invert(1)' }}
          loading="lazy"
        />
      ) : (
        <span className="text-sm">{name}</span>
      )}

      <ExternalLink className="w-3.5 h-3.5 text-[var(--c-ink-dim)] group-hover:text-[var(--c-accent-2)] transition-colors" />
    </a>
  );
}
