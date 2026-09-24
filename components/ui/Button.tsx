import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import clsx from "clsx";

type Variant = "gold" | "deep-green" | "outline" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-green disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-gold-ink hover:bg-[#bb9a5f]",
  "deep-green": "bg-deep-green text-white hover:bg-[#1c2e26]",
  outline: "border border-ink/20 text-ink hover:border-ink/40 bg-transparent",
  ghost: "text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[15px]",
  sm: "px-4 py-2 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
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
  const { variant = "gold", size = "md", className, ...rest } = props;
  const classes = clsx(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return <Link href={href} className={classes} {...linkRest} />;
  }

  const buttonRest = rest as Omit<ButtonAsButton, "variant" | "size" | "className">;
  return <button className={classes} {...buttonRest} />;
}

export function IconButton({
  as: Component = "button",
  className,
  ...rest
}: { as?: ElementType; className?: string } & Record<string, unknown>) {
  return (
    <Component
      className={clsx(
        "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-green",
        className
      )}
      {...rest}
    />
  );
}
