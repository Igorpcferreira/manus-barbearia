import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, X, Calendar, Phone, ArrowUp } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '@/components/icons';
import { links } from '@/data/site';

const actions = [
  { href: links.booksy, label: 'Agendar online', icon: Calendar, accent: '#ff7a1a' },
  { href: links.whatsapp, label: 'WhatsApp', icon: WhatsAppIcon, accent: '#25d366' },
  { href: links.instagram, label: 'Instagram', icon: InstagramIcon, accent: '#e1306c' },
  { href: links.tel, label: 'Ligar', icon: Phone, accent: '#ffb36b' },
];

export default function Fab() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="grid size-11 place-items-center rounded-full border border-line bg-panel/80 text-bone-2 backdrop-blur transition-colors hover:border-neon hover:text-neon"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="flex flex-col items-end gap-2.5"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
            }}
          >
            {actions.map((a) => {
              const Icon = a.icon;
              return (
                <motion.a
                  key={a.label}
                  href={a.href}
                  target={a.href.startsWith('tel:') ? undefined : '_blank'}
                  rel="noopener"
                  variants={{
                    hidden: { opacity: 0, x: 20, scale: 0.8 },
                    visible: { opacity: 1, x: 0, scale: 1 },
                  }}
                  className="flex items-center gap-2.5"
                >
                  <span className="rounded-md bg-void/85 px-2.5 py-1 text-xs font-medium text-bone shadow-md backdrop-blur">
                    {a.label}
                  </span>
                  <span
                    className="grid size-12 place-items-center rounded-full border border-line bg-panel text-bone shadow-glow-sm"
                    style={{ color: a.accent }}
                  >
                    <Icon className="size-5" />
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="cta-attract relative grid size-14 place-items-center overflow-hidden rounded-full bg-neon text-void shadow-glow transition-transform hover:scale-105 active:scale-95"
        aria-label={open ? 'Fechar menu de contato' : 'Abrir menu de contato'}
        aria-expanded={open}
      >
        <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ duration: 0.2 }}>
          {open ? <X className="size-6" /> : <Plus className="size-6" />}
        </motion.span>
      </button>
    </div>
  );
}
