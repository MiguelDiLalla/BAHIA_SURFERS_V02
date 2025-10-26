import { Instagram, Facebook } from 'lucide-react';

export function SocialLinks() {
  const socials = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/bahiasurfersdab',
      icon: Instagram,
      handle: '@bahiasurfersdab'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/vicentealfredo.colmenarescanellas/',
      icon: Facebook,
      handle: 'Bahia Surfers'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--c-primary-blue)]/20 bg-[var(--c-primary-blue)]/5 hover:bg-[var(--c-primary-blue)]/10 hover:border-[var(--c-primary-blue)]/40 transition-all duration-300 group"
          aria-label={`Síguenos en ${social.name}`}
        >
          <social.icon 
            className="w-5 h-5 text-[var(--c-primary-blue)] group-hover:scale-110 transition-transform" 
          />
          <span className="text-sm text-[var(--c-ink-dim)] group-hover:text-[var(--c-ink)]">
            {social.handle}
          </span>
        </a>
      ))}
    </div>
  );
}
