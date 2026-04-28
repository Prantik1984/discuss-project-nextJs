"use client";
import * as actions from "@/actions";
import { useActionState } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Textarea,
} from "@nextui-org/react";
export default function TopicCreateForm() {
  const [formState, action] = useActionState(actions.createTopic, {
    errors: {},
  });
  return (
    <div>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Create Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg">Create a Topic</h3>
              <Input label="Name" labelPlacement="outside" placeholder="Name" />
              <Textarea
                label="Description"
                labelPlacement="outside"
                placeholder="Describe your topic"
              />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
