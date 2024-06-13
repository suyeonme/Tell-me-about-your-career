export const BUTTON_TYPE_COLORS = Object.freeze({
  outline: {
    normal:
      "border-solid border-2 border-black text-black hover:bg-black hover:text-white",
    critical:
      "border-solid border-2 border-critical text-critical hover:bg-critical_hover hover:border-critical_hover hover:text-white",
  },
  fill: {
    normal: "bg-black text-white hover:bg-normal_hover",
    critical: "bg-critical text-white hover:bg-critical_hover",
  },
  text: {
    normal: "text-black hover:text-normal_hover",
    critical: "text-critical hover:text-critical_hover",
  },
});

export const BUTTON_SIZE = Object.freeze({
  sm: "py-1.5 px-3 text-sm",
  md: "py-2 px-4 text-sm",
  lg: "py-2 px-4 text-base",
});

export const BUTTON_LOADING_COLORS = Object.freeze({
  outline: {
    normal: "black",
    critical: "critical",
  },
  fill: {
    normal: "white",
    critical: "white",
  },
  text: {
    normal: "black",
    critical: "critical",
  },
});
