import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";

type Variant = "gold" | "deep-green" | "outline" | "outline-light" | "ghost";
type Size = "md" | "sm";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold tracking-[0.01em] select-none " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out " +
  "motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-deep-green " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  gold: "[text-shadow:none] bg-gold text-gold-ink shadow-[0_1px_0_rgba(32,35,31,0.08)] hover:bg-[#d3b57a] hover:shadow-[0_8px_20px_rgba(198,167,106,0.45)]",
  "deep-green":
    "[text-shadow:none] bg-deep-green text-white hover:bg-[#1c2e26] hover:shadow-[0_8px_20px_rgba(38,59,50,0.35)] focus-visible:ring-offset-background",
  outline:
    "[text-shadow:none] border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white hover:shadow-[0_8px_20px_rgba(32,35,31,0.2)]",
  "outline-light":
    "[text-shadow:0_1px_2px_rgba(10,12,9,0.35),0_2px_10px_rgba(10,12,9,0.3)] hover:[text-shadow:none] border border-white/70 bg-white/5 text-white backdrop-blur-[2px] hover:border-white hover:bg-white hover:text-ink focus-visible:ring-white focus-visible:ring-offset-transparent",
  ghost: "text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 py-3 text-[15px]",
  sm: "min-h-11 px-4 py-2 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  children?: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps> & {
    href: ComponentPropsWithoutRef<typeof Link>["href"];
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "gold", size = "md", className, arrow, children, ...rest } = props;
  const classes = clsx(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest as Omit<ButtonAsLink, keyof CommonProps>;
    const showArrow = arrow ?? variant !== "ghost";
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
        {showArrow ? (
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 ease-out motion-safe:group-hover/btn:translate-x-1 motion-safe:group-focus-visible/btn:translate-x-1"
          />
        ) : null}
      </Link>
    );
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button className={classes} {...buttonRest}>
      {children}
      {arrow ? (
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="shrink-0 transition-transform duration-200 ease-out motion-safe:group-hover/btn:translate-x-1"
        />
      ) : null}
    </button>
  );
}
