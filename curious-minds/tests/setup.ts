// Loads local env for the test harness. .env.test.local wins; .env.local
// is the fallback so a single-file setup also works.
import { config } from "dotenv";
config({ path: ".env.test.local" });
config({ path: ".env.local" });
