import React from "react";

import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import type { ButtonVariant, ButtonStatus, ButtonSize } from "./Button.type";
import {
  BUTTON_TYPE_COLORS,
  BUTTON_SIZE,
  BUTTON_LOADING_COLORS,
} from "./Button.style";

interface ButtonProps {
  variant: ButtonVariant;
  status: ButtonStatus;
  size: ButtonSize;
  /**@description 커스텀 스타일 */
  className?: string;
  isLoading?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Button = ({
  variant,
  size,
  status,
  className,
  isLoading,
  onClick,
  children,
}: ButtonProps) => {
  let applyClassName =
    "rounded transition-colors duration-300 active:animate-click" + " ";
  applyClassName += BUTTON_TYPE_COLORS[variant][status] + " ";
  applyClassName += BUTTON_SIZE[size];

  return (
    <button
      className={className ? `${applyClassName} ${className}` : applyClassName}
      onClick={onClick ? onClick : undefined}
    >
      <span className="flex align-middle justify-center gap-1">
        {isLoading !== undefined && isLoading === true && (
          <LoadingSpinner
            size="sm"
            color={`border-${BUTTON_LOADING_COLORS[variant][status]}`}
          />
        )}
        {children}
      </span>
    </button>
  );
};

export default React.memo(Button);
