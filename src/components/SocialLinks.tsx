import { Instagram, Facebook } from 'lucide-react';

export function SocialLinks() {
  const socials = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/bahiasurfersdab',
      icon: Instagram,
      handle: '@bahiasurfersdab',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/vicentealfredo.colmenarescanellas/',
      icon: Facebook,
      handle: 'Bahia Surfers',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 group"
          style={{
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.05)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.15)';
            e.currentTarget.style.borderColor = '#22d3ee';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.05)';
            e.currentTarget.style.borderColor = '#06b6d4';
          }}
          aria-label={`Síguenos en ${social.name}`}
        >
          <social.icon
            className="w-5 h-5 group-hover:scale-110 transition-transform"
            style={{ color: '#06b6d4' }}
          />
          <span className="text-sm text-[var(--c-ink-dim)] group-hover:text-[var(--c-ink)]">
            {social.handle}
          </span>
        </a>
      ))}
    </div>
  );
}
