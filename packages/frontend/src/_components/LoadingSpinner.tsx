type LoadingSpinnerSize = "sm" | "md" | "lg";

interface LoadingSpinnerProps {
  color?: `border-${string}`;
  size?: LoadingSpinnerSize;
}

const LoadingSpinner = ({
  size = "md",
  color = "border-black",
}: LoadingSpinnerProps) => {
  let applySize = "";

  switch (size) {
    case "sm":
      applySize = "w-4 h-4 border-2";
      break;
    case "md":
    default:
      applySize = "w-8 h-8 border-4";
      break;
    case "lg":
      applySize = "w-12 h-12 border-4";
      break;
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${applySize} ${color} border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default LoadingSpinner;
