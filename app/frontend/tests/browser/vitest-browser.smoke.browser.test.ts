import { describe, expect, test } from "vitest"

describe("vitest browser smoke", () => {
	test("runs in real Chromium via Vitest browser mode", () => {
		expect(globalThis.window).toBeDefined()
		expect(globalThis.document).toBeDefined()
	})
})
