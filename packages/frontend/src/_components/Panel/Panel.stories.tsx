import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@components";
import Panel from "./Panel";

const meta: Meta<typeof Panel> = {
  title: "Components/Panel",
  component: Panel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Panel component used for wrapping its contents.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Panel title",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: {
    title: "Panel Title",
    children: "Panel Content",
  },
};

export const PanelWithoutTitle: Story = {
  args: {
    children: "Panel Content",
  },
};

export const FormPanel: Story = {
  args: {
    title: "Panel Title",
    children: (
      <div className="w-full flex flex-col gap-3">
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email"
          className="solid-border-black"
        />
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Password"
          className="solid-border-black"
        />
        <Button
          variant="fill"
          status="normal"
          size="md"
          onClick={() => undefined}
        >
          Signin
        </Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Use this Panel for Form component ",
      },
    },
  },
};
