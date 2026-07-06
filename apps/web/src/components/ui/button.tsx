import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import {
  BrandActionButtonContent,
  getBrandActionButtonClassName,
  type BrandActionButtonVariant,
} from "./brand-action-button";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

function variantToBrandVariant(variant: ButtonVariant): BrandActionButtonVariant {
  if (variant === "ghost") return "light";
  return variant;
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button className={getBrandActionButtonClassName({ className, variant: variantToBrandVariant(variant) })} {...props}>
      <BrandActionButtonContent>{children}</BrandActionButtonContent>
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "primary",
  className = "",
  href,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={getBrandActionButtonClassName({ className, variant: variantToBrandVariant(variant) })} href={href} {...props}>
      <BrandActionButtonContent>{children}</BrandActionButtonContent>
    </Link>
  );
}
