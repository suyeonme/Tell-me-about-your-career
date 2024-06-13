import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";

import Button from "./Button";
import type { ButtonSize, ButtonVariant, ButtonStatus } from "./Button.type";

const BUTTON_SIZE: ReadonlyArray<ButtonSize> = Object.freeze([
  "sm",
  "md",
  "lg",
]);
const BUTTON_VARIANT: ReadonlyArray<ButtonVariant> = Object.freeze([
  "outline",
  "fill",
  "text",
]);
const BUTTON_STATUS: ReadonlyArray<ButtonStatus> = Object.freeze([
  "normal",
  "critical",
]);

const formatSizeText = (size: ButtonSize) => {
  switch (size) {
    case "sm":
      return "Small";
    case "md":
      return "Medium";
    case "lg":
      return "Large";
  }
};

const capitalizeFirstChar = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button component used for triggering actions or submitting forms.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["outline", "fill", "text"],
      description: "Button Variations",
    },
    status: {
      control: "radio",
      options: ["normal", "critical"],
      description: "Button Status",
    },
    size: {
      control: "radio",
      options: BUTTON_SIZE,
      description: "Button Size",
    },
    isLoading: { control: "boolean" },
    children: { control: "text" },
    className: { control: "text" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

// type Story = StoryObj<typeof meta>;

export const Size = () => {
  return (
    <div>
      {BUTTON_SIZE.map((size) => (
        <div className="mb-4">
          <h3>{formatSizeText(size)}</h3>
          <Button
            variant="fill"
            size={size}
            status="normal"
            isLoading={false}
            onClick={() => action("Button is Clicked")}
          >
            Button
          </Button>
        </div>
      ))}
    </div>
  );
};

export const Variant = () => {
  return (
    <div>
      {BUTTON_VARIANT.map((variant) => (
        <div className="mb-4">
          <h3>{capitalizeFirstChar(variant)}</h3>
          <Button
            variant={variant}
            size="md"
            status="normal"
            isLoading={false}
            onClick={() => action("Button is Clicked")}
          >
            Button
          </Button>
        </div>
      ))}
    </div>
  );
};

export const Status = () => {
  return (
    <div>
      {BUTTON_STATUS.map((status) => (
        <div className="mb-4">
          <h3>{capitalizeFirstChar(status)}</h3>
          <Button
            variant="fill"
            size="md"
            status={status}
            isLoading={false}
            onClick={() => action("Button is Clicked")}
          >
            Button
          </Button>
        </div>
      ))}
    </div>
  );
};
