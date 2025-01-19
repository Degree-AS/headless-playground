"use server";

import { FormState, LoginFormSchema } from "@/components/auth";
import { redirect } from "next/navigation";

export async function login(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const { email, password } = validatedFields.data || {};

  if (!validatedFields.success) {
    return {
      email: email || (formData.get("email") as string),
      password: password || (formData.get("password") as string),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // send email and password to the server

  // Example:
  // const data = await graphqlRequest<LoginMutation>({
  //   query: LOGIN_MUTATION,
  //   variables: { email, password },
  // });

  // if (!data) {
  //   return {
  //     message: "Invalid email or password",
  //   };
  // }
  // await createSession(data.login.accessToken);

  const demoEmail = "demo@demo.com";
  const demoPassword = "demo";

  if (email !== demoEmail && password !== demoPassword) {
    return {
      email: email,
      password: password,
      errors: { email: ["Invalid email"], password: ["Invalid password"] },
    };
  }
  if (email !== demoEmail) {
    return {
      email: email,
      password: password,
      errors: { email: ["Invalid email"] },
    };
  }

  if (password !== demoPassword) {
    return {
      email: email,
      password: password,
      errors: { password: ["Invalid password"] },
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  redirect("/dashboard");
}
