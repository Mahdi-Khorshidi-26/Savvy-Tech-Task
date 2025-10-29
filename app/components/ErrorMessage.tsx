import React from "react";
import type { HTMLAttributes } from "react";

type ErrorVariant = "error" | "warning" | "success" | "info";

type ErrorSize = "sm" | "md" | "lg";

interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ErrorVariant;
  size?: ErrorSize;
  message?: string | React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantStyles: Record<ErrorVariant, string> = {
  error: "bg-red-50 border-l-4 border-red-500 text-red-800",
  warning: "bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800",
  success: "bg-green-50 border-l-4 border-green-500 text-green-800",
  info: "bg-blue-50 border-l-4 border-blue-500 text-blue-800",
};

const sizeStyles: Record<ErrorSize, string> = {
  sm: "px-3 py-2 text-sm rounded",
  md: "px-4 py-3 text-base rounded-lg",
  lg: "px-6 py-4 text-lg rounded-lg",
};

const iconVariantMap: Record<ErrorVariant, string> = {
  error: "✗",
  warning: "⚠️",
  success: "✓",
  info: "ℹ️",
};

export const ErrorMessage = React.forwardRef<HTMLDivElement, ErrorMessageProps>(
  (
    {
      variant = "error",
      size = "md",
      message,
      icon,
      dismissible = false,
      onDismiss,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible || (!message && !children)) {
      return null;
    }

    const baseStyles =
      "flex items-start gap-3 font-medium transition-all duration-200";

    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];
    const defaultIcon = icon || iconVariantMap[variant];

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyle} ${sizeStyle} ${className || ""}`}
        role="alert"
        {...props}
      >
        {defaultIcon && (
          <div className="shrink-0 flex items-center">
            {typeof defaultIcon === "string" ? (
              <span className="text-lg">{defaultIcon}</span>
            ) : (
              defaultIcon
            )}
          </div>
        )}
        <div className="flex-1">{message || children}</div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="shrink-0 ml-2 text-lg leading-none opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss message"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);

ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage;

// Basic error
//<ErrorMessage message="Something went wrong!" />

// Warning with dismissible
//<ErrorMessage
//  variant="warning"
//  message="This action cannot be undone"
//  dismissible
//  onDismiss={() => console.log('dismissed')}
// />

// Success message
//<ErrorMessage variant="success" message="Changes saved successfully!" />

// Info with custom icon
// <ErrorMessage variant="info" icon="🛈" message="This is informational" />

// Using children
//<ErrorMessage variant="error">
//  <strong>Error:</strong> Invalid input
//</ErrorMessage>
