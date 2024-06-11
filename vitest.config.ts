import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig((env) =>
  mergeConfig(
    viteConfig(env),
    defineConfig({
      test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./vitest/setup.ts"],
        coverage: {
          provider: "v8",
          include: ["**/*.{ts,tsx}"],
          exclude: [
            "**/schemas/**",
            "tailwind.config.ts",
            ".next/**",
            "**/*-provider.tsx",
            "**/layout.tsx",
            "**/middleware.ts",
          ],
        },
      },
    })
  )
);
