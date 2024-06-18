interface InputProps {
  required?: boolean;
  type: string;
  placeholder: string;
  status: "normal" | "critical";
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  required,
  placeholder,
  status,
  type,
  name,
  onChange,
}: InputProps) => {
  return (
    <>
      {required && <span className="text-critical">*</span>}
      <input
        required={required}
        type={type}
        name={name}
        placeholder={placeholder ?? name}
        className={
          status === "critical"
            ? "border-2 border-critical rounded text-xs leading-6"
            : "border-2 solid-border-black rounded text-xs leading-6"
        }
        onChange={onChange}
      />
    </>
  );
};

export default Input;
