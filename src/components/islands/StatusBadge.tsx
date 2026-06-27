import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { openingHours } from '@/data/site';

const DAY: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};
const TZ = 'America/Sao_Paulo';

function computeOpen(): boolean {
  try {
    const now = new Date();
    const dayName = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      weekday: 'short',
    }).format(now);
    const hm = new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);
    const [h, m] = hm.split(':').map(Number);
    const mins = h * 60 + m;
    const win = openingHours[DAY[dayName] ?? -1];
    return !!win && mins >= win.open && mins < win.close;
  } catch {
    return false;
  }
}

export default function StatusBadge() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setOpen(computeOpen());
    const id = setInterval(() => setOpen(computeOpen()), 60_000);
    return () => clearInterval(id);
  }, []);

  const label =
    open === null ? 'Verificando horário…' : open ? 'Aberto agora' : 'Fechado no momento';
  const color = open ? '#4ade80' : open === false ? '#9c8a78' : '#ffb36b';

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/60 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-bone-2 backdrop-blur-sm">
      <motion.span
        className="relative inline-block size-2.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        animate={open ? { scale: [1, 1.35, 1], opacity: [1, 0.7, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}
