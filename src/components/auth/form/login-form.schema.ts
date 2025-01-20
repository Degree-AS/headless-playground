import { z } from "zod";

const schema = z.object({
  email: z.string().min(1).max(100),
  password: z.string().min(1),
});

export { schema };
