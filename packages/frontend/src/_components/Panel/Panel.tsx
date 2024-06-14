interface PanelProps {
  title?: string;
  children: React.ReactNode;
}

const Panel = ({ title, children }: PanelProps) => {
  return (
    <div className="shadow-lg rounded p-3 w-auto">
      {title && <h1 className="text-center mb-1">{title}</h1>}
      {children}
    </div>
  );
};

export default Panel;
