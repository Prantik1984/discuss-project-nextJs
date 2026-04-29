"use client";
import * as actions from "@/actions";
import { useActionState, startTransition } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Textarea,
  Form,
} from "@nextui-org/react";
export default function TopicCreateForm() {
  const [formState, action] = useActionState(actions.createTopic, {
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Create Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg">Create a Topic</h3>
              <Input
                name="name"
                label="Name"
                labelPlacement="outside"
                placeholder="Name"
                isInvalid={!!formState.errors.name}
                errorMessage={formState.errors.name?.join(",")}
              />
              <Textarea
                name="description"
                label="Description"
                labelPlacement="outside"
                placeholder="Describe your topic"
                isInvalid={!!formState.errors.description}
                errorMessage={formState.errors.description?.join(", ")}
              />
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
