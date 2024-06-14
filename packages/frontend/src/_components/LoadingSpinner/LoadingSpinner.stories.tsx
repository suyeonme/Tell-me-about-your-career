import type { Meta, StoryObj } from "@storybook/react";

import LoadingSpinner from "./LoadingSpinner";

const TAILWIND_CSS_COLORS: ReadonlyArray<`border-${string}`> = Object.freeze([
  "border-red-500",
  "border-green-500",
  "border-blue-500",
  "border-yellow-500",
  "border-purple-500",
  "border-pink-500",
]);

const meta: Meta<typeof LoadingSpinner> = {
  title: "Components/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "LoadingSpinner component used for indicating fetching data.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size",
    },
    color: {
      control: {
        type: "select",
      },
      options: TAILWIND_CSS_COLORS,
      description:
        "The color of the loading spinner using TailwindCSS classes.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};
