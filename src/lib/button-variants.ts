import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  "relative isolate overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-display font-semibold uppercase tracking-[0.12em] transition-all duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon disabled:opacity-50 disabled:pointer-events-none [&_svg]:size-[1.15em] [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-neon text-void shadow-glow hover:brightness-110 hover:-translate-y-0.5",
        gold:
          "bg-gradient-to-r from-amber to-gold text-void shadow-glow-gold hover:brightness-110 hover:-translate-y-0.5",
        ghost:
          "border border-line bg-panel/40 text-bone hover:border-neon hover:text-neon hover:-translate-y-0.5",
        outline:
          "border border-neon/60 text-neon hover:bg-neon hover:text-void",
      },
      size: {
        sm: "text-xs px-4 py-2.5",
        default: "text-sm px-6 py-3.5",
        lg: "text-sm px-8 py-4",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
