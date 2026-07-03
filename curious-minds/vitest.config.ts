import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    testTimeout: 20000,
    hookTimeout: 30000,
    // Auth + RLS tests share a live local database; run serially.
    pool: "forks",
    poolOptions: { forks: { singleFork: true } },
    setupFiles: ["tests/setup.ts"],
  },
});
