import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "cyrus-imap-api-server";

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

async function main() {
  const users = await trpc.userList.query();

  console.log("Users:", users);

  const createdUser = await trpc.userCreate.mutate({ name: "Pancha" });

  console.log("Created user:", createdUser);

  const user = await trpc.userById.query("1");

  console.log("User 1:", user);
}

main().catch(console.error);
