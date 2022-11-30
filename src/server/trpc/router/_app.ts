import { router } from "../trpc";
import { authRouter } from "./auth";
import { generalRouter } from "./general";
import { onboardRouter } from "./onboard";

export const appRouter = router({
  general: generalRouter,
  auth: authRouter,
  onboard: onboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
