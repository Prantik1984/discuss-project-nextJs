import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/profile";
export default async function Home() {
  const session = await auth();
  return (
    <div>
      {/* <form action={actions.signIn}>
        <Button type="Submit">Sign In</Button>
      </form>
      <form action={actions.signOut}>
        <Button type="Submit">Sign out</Button>
      </form> */}

      {/* <Profile></Profile> */}
    </div>
  );
}
