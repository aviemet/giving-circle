import { describe, expect, test } from "vitest"

import { buildFlexStyle } from "@/components/VisualEditor/fields/flex"

describe("components/VisualEditor/fields/flex/style", () => {
	test("flex layout does not default to scrollable overflow", () => {
		expect(buildFlexStyle({ flex: { display: "flex" } })).not.toHaveProperty("overflow", "auto")
	})

	test("applies minHeight zero only when overflow is auto or hidden", () => {
		expect(buildFlexStyle({ flex: { display: "flex", overflow: "auto" } })).toMatchObject({
			overflow: "auto",
			minHeight: 0,
		})
	})
})
