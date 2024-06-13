import React from "react";
import { LoadingSpinner } from "@components";
import type { ButtonType, ButtonStatus, ButtonSize } from "./Button.type";
import {
  BUTTON_TYPE_COLORS,
  BUTTON_SIZE,
  BUTTON_LOADING_COLORS,
} from "./Button.style";

interface ButtonProps {
  /**@description 버튼의 기본 형태 */
  type: ButtonType;
  status: ButtonStatus;
  size: ButtonSize;
  /**@description 커스텀 스타일 */
  className?: string;
  onClick: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = ({
  type,
  size,
  status,
  className,
  isLoading,
  onClick,
  children,
}: ButtonProps) => {
  let applyClassName = "rounded transition-colors duration-300" + " ";
  applyClassName += BUTTON_TYPE_COLORS[type][status] + " ";
  applyClassName += BUTTON_SIZE[size];

  return (
    <button
      className={className ? `${applyClassName} ${className}` : applyClassName}
      onClick={onClick}
    >
      <span className="flex align-middle gap-1">
        {isLoading !== undefined && isLoading === true && (
          <LoadingSpinner
            size="sm"
            color={`border-${BUTTON_LOADING_COLORS[type][status]}`}
          />
        )}
        {children}
      </span>
    </button>
  );
};

export default React.memo(Button);
