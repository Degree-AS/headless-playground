import { z } from "zod";

const schema = z.object({
  username: z.string().min(2).max(100),
  password: z.string().min(1),
});

const onSubmit = async (data: z.infer<typeof schema>) => {
  const isServer = typeof window === "undefined" ? false : true;
  console.log(`Form handler initialized ${isServer ? "server" : "client"} side`);
  console.log("Submitted values: ", data);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Form handler completed");
};

export { schema, onSubmit };
