"use client";

import { useState } from "react";
import { signin } from "@api/api/auth";
import { FormPanel } from "@components";

interface SigninForm {
  email: string;
  password: string;
}

const Signin = () => {
  const [form, setForm] = useState<SigninForm>({ email: "", password: "" });

  const handleChangeForm = <K extends keyof SigninForm>(
    key: K,
    value: SigninForm[K]
  ) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지
    event.preventDefault();

    try {
      const data = await signin(form);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-full">
      <FormPanel title="Signin">
        <form onSubmit={handleSubmit} method="post">
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="solid-border-black"
            onChange={(e) => handleChangeForm("email", e.target.value)}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="solid-border-black"
            onChange={(e) => handleChangeForm("password", e.target.value)}
          />
          <input type="submit" value="Signin" />
        </form>
      </FormPanel>
    </section>
  );
};

export default Signin;
