import React from "react";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "ghost"
  | "outline";

type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500",
  secondary:
    "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-gray-500",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500",
  success:
    "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500",
  warning:
    "bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800 focus:ring-yellow-500",
  ghost:
    "bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500",
  outline:
    "bg-transparent border-2 border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm font-medium rounded",
  md: "px-4 py-2 text-base font-medium rounded-lg",
  lg: "px-6 py-3 text-lg font-semibold rounded-lg",
  xl: "px-8 py-4 text-xl font-semibold rounded-xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      icon,
      iconPosition = "left",
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const widthStyle = fullWidth ? "w-full" : "";
    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];

    const loadingSpinner = (
      <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyle} ${sizeStyle} ${widthStyle} ${className || ""}`}
        {...props}
      >
        {isLoading ? (
          <>
            {loadingSpinner}
            <span>{children}</span>
          </>
        ) : icon ? (
          <>
            {iconPosition === "left" && icon}
            <span>{children}</span>
            {iconPosition === "right" && icon}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
