import { Button, FormPanel } from "@components";

const Signin = () => {
  return (
    <section className="h-full">
      <FormPanel title="Signin">
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

        {/* <Button
          variant="fill"
          status="normal"
          size="md"
          onClick={() => undefined}
        >
          Signin
        </Button> */}
      </FormPanel>
    </section>
  );
};

export default Signin;
