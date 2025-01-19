import { LoginForm, LoginFormServer } from "@/components/auth";

export default function Login() {
  return (
    <>
      <div className="mb-10">
        <LoginForm />
      </div>
      <div>
        <LoginFormServer />
      </div>
    </>
  );
}
