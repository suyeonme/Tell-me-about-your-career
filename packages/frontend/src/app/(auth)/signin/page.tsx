"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signin } from "@api/api/auth";
import { FormPanel } from "@components";
import { AxiosError } from "axios";

interface SigninForm {
  email: string;
  password: string;
}

const Signin = () => {
  const router = useRouter();

  const [form, setForm] = useState<SigninForm>({ email: "", password: "" });

  const handleChangeForm = <K extends keyof SigninForm>(
    key: K,
    value: SigninForm[K]
  ) => {
    setForm({ ...form, [key]: value });
  };

  const handleResetForm = () => {
    setForm({ email: "", password: "" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지
    event.preventDefault();

    try {
      const response = await signin(form);
      const { data } = response;

      if (data.statusCode === 201) {
        handleResetForm();
        router.push("/");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      /**@todo 에러 메세지 출력 */
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
