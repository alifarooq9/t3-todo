// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { todos } from "./todos";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("todo.", todos);

// export type definition of API
export type AppRouter = typeof appRouter;
