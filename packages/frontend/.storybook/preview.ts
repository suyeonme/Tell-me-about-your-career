import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

/**@summary 모든 Story에 global하게 적용될 포맷을 세팅 */

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
