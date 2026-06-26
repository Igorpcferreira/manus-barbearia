import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryItem {
  thumb: string;
  full: string;
  alt: string;
  caption: string;
}

export default function Lightbox({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, prev, next]);

  return (
    <>
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {items.map((it, i) => (
          <button
            key={it.thumb}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-panel transition-all duration-300 hover:border-neon/50 hover:shadow-glow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon"
            aria-label={`Ampliar: ${it.caption}`}
          >
            <img
              src={it.thumb}
              alt={it.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/90 to-transparent p-3 text-left text-xs font-medium text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {it.caption}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && index !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-void/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={items[index].caption}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-line bg-panel/70 text-bone transition-colors hover:border-neon hover:text-neon"
              aria-label="Fechar"
            >
              <X className="size-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-panel/70 text-bone transition-colors hover:border-neon hover:text-neon sm:left-6"
              aria-label="Anterior"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-panel/70 text-bone transition-colors hover:border-neon hover:text-neon sm:right-6"
              aria-label="Próxima"
            >
              <ChevronRight className="size-5" />
            </button>

            <motion.figure
              key={items[index].full}
              className="max-h-[85vh] max-w-[92vw]"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={items[index].full}
                alt={items[index].alt}
                className="max-h-[78vh] w-auto rounded-xl border border-line object-contain shadow-glow-sm"
              />
              <figcaption className="mt-3 text-center text-sm text-bone-2">
                {items[index].caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
