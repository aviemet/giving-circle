import { describe, expect, test } from "vitest"

import * as layoutChrome from "@/components/VisualEditor/layoutChrome.editor.css"

describe("components/VisualEditor/layoutChrome", () => {
	test("exports frame and label classes for editor-only layout boundaries", () => {
		expect(typeof layoutChrome.frame).toBe("string")
		expect(layoutChrome.frame.length).toBeGreaterThan(0)
		expect(typeof layoutChrome.labelContainer).toBe("string")
		expect(typeof layoutChrome.labelGrid).toBe("string")
	})
})
