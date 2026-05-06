import { defineConfig, mergeConfig } from "vitest/config"

import viteConfig from "./vite.config"

export default defineConfig((env) => mergeConfig(
	viteConfig(env),
	defineConfig({
		test: {
			fileParallelism: false,
			globals: true,
			environment: "jsdom",
			coverage: {
				include: ["app/frontend/**/*.test.{ts,tsx}"],
			},
			setupFiles: ["./tests/helpers/mockServer.ts"],
		},
	}),
))
