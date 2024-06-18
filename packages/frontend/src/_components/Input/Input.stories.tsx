import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Input component",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: "boolean",
      //   description: "Panel title",
    },
    placeholder: {
      control: "text",
    },
    status: {
      control: "radio",
      options: ["normal", "critical"],
    },
    type: {
      control: "select",
      options: ["email", "password", "text"],
    },
    name: {
      control: "text",
    },
  },
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    required: true,
    placeholder: "Normal Input",
    status: "normal",
    type: "text",
    name: "email",
    onChange: (name, value) => console.log(name, value),
  },
};
