'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../config/i18n/navigation';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocale = e.target.value;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div
      className="relative flex w-fit rounded-xl backdrop-blur-xl overflow-hidden"
      style={{
        background: 'rgba(20, 20, 35, 0.5)',
        boxShadow: `
          inset 1px 1px 3px rgba(255, 255, 255, 0.06),
          inset -1px -1px 4px rgba(0, 0, 0, 0.5),
          0 2px 8px rgba(0, 0, 0, 0.3)
        `,
        border: '1px solid rgba(60, 60, 80, 0.3)',
      }}
    >
      <input
        type="radio"
        name="locale"
        value="ru"
        id="locale-ru"
        checked={locale === 'ru'}
        onChange={handleChange}
        className="hidden"
      />
      <input
        type="radio"
        name="locale"
        value="en"
        id="locale-en"
        checked={locale === 'en'}
        onChange={handleChange}
        className="hidden"
      />

      <div
        className="absolute top-0 bottom-0 w-1/2 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.37,1.95,0.66,0.56)]"
        style={{
          transform: locale === 'ru' ? 'translateX(0%)' : 'translateX(100%)',
          background: 'linear-gradient(135deg, rgba(0, 255, 204, 0.2), rgba(0, 255, 204, 0.35))',
          boxShadow: `
            0 0 12px rgba(0, 255, 204, 0.3),
            0 0 6px rgba(0, 255, 204, 0.15) inset
          `,
          border: '1px solid rgba(0, 255, 204, 0.25)',
          backdropFilter: 'blur(4px)',
        }}
      />

      <label
        htmlFor="locale-ru"
        className="relative z-10 flex items-center justify-center min-w-[60px] px-3 py-2 text-xs font-semibold tracking-wide cursor-pointer transition-colors duration-300"
        style={{
          color: locale === 'ru' ? '#ffffff' : '#a0a0b0',
          textShadow: locale === 'ru' ? '0 0 6px #00ffcc' : 'none',
        }}
      >
        RU
      </label>
      <label
        htmlFor="locale-en"
        className="relative z-10 flex items-center justify-center min-w-[60px] px-3 py-2 text-xs font-semibold tracking-wide cursor-pointer transition-colors duration-300"
        style={{
          color: locale === 'en' ? '#ffffff' : '#a0a0b0',
          textShadow: locale === 'en' ? '0 0 6px #00ffcc' : 'none',
        }}
      >
        EN
      </label>
    </div>
  );
}