import { useState } from 'react';
import { iconKind, skillEmoji } from '../../utils/skills';

// Complete class strings so Tailwind generates them.
const SIZES = {
  md: { image: 'h-7 w-7 object-contain', glyph: 'text-2xl leading-7', initial: 'h-7 w-7 text-sm' },
  lg: { image: 'h-9 w-9 object-contain', glyph: 'text-3xl leading-9', initial: 'h-9 w-9 text-lg' },
};

/**
 * Picks the best icon available: uploaded image -> emoji typed in the CMS -> emoji for known skills -> first letter.
 * Decorative: the skill name is always shown next to it.
 */
export default function SkillIcon({ name, icon, size = 'md' }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const sizes = SIZES[size] ?? SIZES.md;
  const kind = iconKind(icon);

  if (kind.type === 'image' && failedSrc !== kind.src) {
    return (
      <img src={kind.src} alt="" loading="lazy" onError={() => setFailedSrc(kind.src)} className={sizes.image} />
    );
  }

  const glyph = kind.type === 'text' ? kind.text : skillEmoji(name);
  if (glyph) {
    return (
      <span aria-hidden="true" className={sizes.glyph}>
        {glyph}
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`flex items-center justify-center rounded-full bg-white/70 font-bold ${sizes.initial}`}
    >
      {(name ?? '').toString().charAt(0).toUpperCase() || '?'}
    </span>
  );
}