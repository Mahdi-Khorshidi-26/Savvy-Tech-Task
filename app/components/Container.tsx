import React, { memo } from "react";
import type { HTMLAttributes, ElementType } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
type ContainerPadding = "none" | "sm" | "md" | "lg" | "xl";
type ContainerSpacing = "none" | "sm" | "md" | "lg" | "xl";

interface ContainerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  size?: ContainerSize;
  padding?: ContainerPadding;
  py?: ContainerSpacing;
  centered?: boolean;
  className?: string;
  as?: ElementType;
  children: React.ReactNode;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-full",
} as const;

const paddingClasses = {
  none: "",
  sm: "px-4",
  md: "px-6",
  lg: "px-8",
  xl: "px-12",
} as const;

const spacingClasses = {
  none: "",
  sm: "py-4",
  md: "py-6",
  lg: "py-8",
  xl: "py-12",
} as const;

const createClassName = (
  ...classes: (string | undefined | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

const Container = memo<ContainerProps>(
  ({
    size = "lg",
    padding = "md",
    py = "none",
    centered = true,
    className,
    as: Component = "div",
    children,
    ...props
  }) => {
    const containerClassName = createClassName(
      sizeClasses[size],
      paddingClasses[padding],
      spacingClasses[py],
      centered && "mx-auto",
      "w-full",
      className
    );

    return (
      <Component className={containerClassName} {...props}>
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";

export { Container };
export default Container;
