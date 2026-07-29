import { defineConfig, mergeConfig } from "vitest/config"

import viteConfig from "./vite.config"

export default defineConfig((env) => mergeConfig(
	viteConfig(env),
	defineConfig({
		test: {
			fileParallelism: true,
			globals: true,
			environment: "jsdom",
			execArgv: ["--no-webstorage"],
			pool: "forks",
			teardownTimeout: 5000,
			hookTimeout: 30000,
			coverage: {
				provider: "v8",
				all: true,
				include: [
					"components/**/*.{ts,tsx}",
					"domains/**/*.{ts,tsx}",
					"features/**/*.{ts,tsx}",
					"layouts/**/*.{ts,tsx}",
					"lib/**/*.{ts,tsx}",
					"pages/**/*.{ts,tsx}",
					"queries/**/*.{ts,tsx}",
					"store/**/*.{ts,tsx}",
				],
				exclude: [
					"tests/**",
					"**/*.{test,spec}.{ts,tsx}",
					"**/*.css.ts",
					"**/*.d.ts",
					"**/index.ts",
					"lib/locales/**",
					"types/**",
					"lib/routes/routes.js",
					"lib/routes/routes.d.ts",
					"lib/theme.ts",
					"lib/routes/urlParams.ts",
					"lib/routes/Routes.js",
				],
				reporter: ["text-summary", "json-summary", "lcov", "html"],
				reportsDirectory: "../coverage/frontend",
			},
			setupFiles: ["./tests/helpers/mockServer.ts"],
		},
	}),
))
