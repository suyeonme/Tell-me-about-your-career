import { useState } from "react";

interface SigninForm {
  email: string;
  password: string;
}

interface UseSignFormProps {
  initialValue: SigninForm;
}

export const useSignForm = (props?: UseSignFormProps) => {
  const [form, setForm] = useState<SigninForm>(
    props?.initialValue ?? { email: "", password: "" }
  );

  const handleChangeForm = <K extends keyof SigninForm>(
    key: K,
    value: SigninForm[K]
  ): void => {
    setForm({ ...form, [key]: value });
  };

  const handleResetForm = (): void => {
    setForm({ email: "", password: "" });
  };

  return {
    form,
    handleChangeForm,
    handleResetForm,
  };
};
