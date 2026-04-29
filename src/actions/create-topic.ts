"use server";
import { z } from "zod";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, {
      message: "Must be in lowercase letters or numbers without spaces",
    }),
  description: z.string().min(10, {
    message: "Minimum 10 characters needed",
  }),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData,
): Promise<CreateTopicFormState> {
  console.log(Array.from(formData.entries()));
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    console.log(result.error.flatten());
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  return {
    errors: {},
  };
}
