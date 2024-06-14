import React from "react";
import { Button, Panel } from "@components";

interface FormPanelProps {
  title?: string;
  children: React.ReactNode;
}

const FormPanel = ({ title, children }: FormPanelProps) => {
  return (
    <div className="w-2/5">
      <Panel title={title}>
        <div className="w-full flex flex-col gap-3">{children}</div>
      </Panel>
    </div>
  );
};

export default FormPanel;
