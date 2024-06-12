import type { ButtonType, ButtonColor, ButtonSize } from "./Button.type";

/**@todo storybook */

interface ButtonProps {
  /**@description 버튼의 기본 형태 */
  type: ButtonType;
  color: ButtonColor;
  size: ButtonSize;
  /**@description 커스텀 스타일 */
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({
  type,
  size,
  color,
  className,
  onClick,
  children,
}: ButtonProps) => {
  let applyColor = "";
  let applyHoverColor = "";

  switch (color) {
    case "critical":
      applyColor = "critical";
      applyHoverColor = "critical_hover";
      break;
    case "normal":
    default:
      applyColor = "black";
      applyHoverColor = "normal_hover";
      break;
  }

  let applyClassName = "rounded" + " ";

  switch (type) {
    case "fill":
      applyClassName += `bg-${applyColor} text-white hover:bg-${applyHoverColor} transition-colors duration-300`;
      break;
    case "text":
      applyClassName += `text-${applyColor} hover:text-${applyHoverColor} transition-colors duration-300`;
      break;
    case "outline":
    default:
      applyClassName += `border-solid border-2 border-${applyColor} text-${applyColor} hover:bg-${applyColor} hover:text-white transition-colors duration-300`;
      break;
  }

  switch (size) {
    case "sm":
      applyClassName += " py-1.5 px-3 text-sm";
      break;
    case "md":
      applyClassName += " py-2 px-4 text-sm";
      break;
    case "lg":
      applyClassName += " py-2 px-4 text-base";
      break;
  }

  return (
    <button
      className={className ? `${applyClassName} ${className}` : applyClassName}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
