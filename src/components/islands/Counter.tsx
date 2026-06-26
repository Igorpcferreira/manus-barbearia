import { useEffect, useRef, useState } from 'react';
import { useInView, animate, useReducedMotion } from 'motion/react';

interface Props {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function Counter({ to, prefix = '', suffix = '', duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  // Inicia no valor final → SSR e fallback sem-JS mostram o número correto.
  const [val, setVal] = useState(to);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}
