import type { CSSProperties, ElementType, ReactNode } from "react";
import styles from "./star-border.module.css";

type StarBorderProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  contentClassName?: string;
  style?: CSSProperties;
} & Record<string, unknown>;

type StarBorderStyle = CSSProperties & Record<`--${string}`, string>;

export function StarBorder({
  as: Component = "button",
  children,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  contentClassName = "",
  style,
  ...rest
}: StarBorderProps) {
  return (
    <Component
      className={`${styles.starBorder} ${className}`}
      style={{
        "--star-border-color": color,
        "--star-border-speed": speed,
        "--star-border-thickness": `${thickness}px`,
        ...style,
      } as StarBorderStyle}
      {...rest}
    >
      <span className={`${styles.starBorderContent} ${contentClassName}`}>{children}</span>
    </Component>
  );
}
