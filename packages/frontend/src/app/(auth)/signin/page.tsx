"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

import { signin } from "@api/api/auth";
import { FormPanel, Button, Input } from "@components";
import type { BaseResponse, User } from "@api/utils/response.type";
import { CustomAxiosError } from "@api/utils/response.type";
import { useSignForm } from "../_hooks/useSignForm";

const Signin = () => {
  const router = useRouter();

  const { form, handleChangeForm, handleResetForm } = useSignForm();

  const { mutate, isLoading, isError, data, error } = useMutation<
    BaseResponse<User>,
    CustomAxiosError,
    React.FormEvent<HTMLFormElement>
  >(
    (event: React.FormEvent<HTMLFormElement>) => {
      // 새로고침 방지
      event.preventDefault();
      return signin(form);
    },
    {
      onSuccess: (data, variables, context) => {
        handleResetForm();
        router.push("/");
      },
      onError: (error, variables, context) => {
        /**@todo 에러 메세지 출력 */
        console.log(error);
      },
      onSettled: (data, error, variables, context) => {
        // finally
      },
    }
  );

  return (
    <section className="h-full">
      <FormPanel title="Signin">
        <form method="post" onSubmit={mutate} className="flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            status={isError ? "critical" : "normal"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeForm("email", e.target.value)
            }
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            status={isError ? "critical" : "normal"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeForm("password", e.target.value)
            }
          />
          <Button
            variant="fill"
            status={isError ? "critical" : "normal"}
            size="md"
            isLoading={isLoading}
          >
            <input type="submit" value="Signin" />
          </Button>
        </form>

        {isError && (
          <span className="text-critical text-xs">{error.message}</span>
        )}
      </FormPanel>
    </section>
  );
};

export default Signin;
