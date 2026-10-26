import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["test/**/*.test.ts"],
    setupFiles: ["./test/setup.ts"]
  },
  resolve: {
    alias: {
      // Use source for @inputmask/jquery to avoid built dist import issues
      "@inputmask/jquery": path.resolve(__dirname, "./src/index.ts")
    }
  }
});