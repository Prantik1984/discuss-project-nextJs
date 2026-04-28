"use server";
import { z } from "zod";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z0-9-]/, {
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
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    desciption: formData.get("description"),
  });

  if (!result.success) {
    console.log("Something went wrong");
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  return {
    errors: {},
  };
}
