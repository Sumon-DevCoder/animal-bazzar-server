import { z } from "zod";

export const loginUserSchemaValidation = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});
