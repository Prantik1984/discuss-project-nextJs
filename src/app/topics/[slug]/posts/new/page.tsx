
"use client";

import * as actions from "@/actions";
import { useActionState, startTransition } from "react";
import { Button, Input, Textarea, Form } from "@nextui-org/react";

interface CreateNewPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function CreateNewPostPage({ params }: CreateNewPostPageProps) {
  const [formState, action] = useActionState(actions.createPost, {
    errors: {},
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const resolvedParams = await params;
    formData.set("topicSlug", resolvedParams.slug);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <Form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            name="title"
            label="Title"
            labelPlacement="outside"
            placeholder="Post title"
            isInvalid={!!formState.errors.title}
            errorMessage={formState.errors.title?.join(", ")}
          />
          <Textarea
            name="content"
            label="Content"
            labelPlacement="outside"
            placeholder="Write your post content here"
            minRows={6}
            isInvalid={!!formState.errors.content}
            errorMessage={formState.errors.content?.join(", ")}
          />
          {formState.errors._form ? (
            <div className="rounded p-2 bg-red-200 border border-red-400 text-sm">
              {formState.errors._form?.join(", ")}
            </div>
          ) : null}
          <input type="hidden" name="topicSlug" />
          <Button type="submit" color="primary">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
