import { describe, expect, test } from "vitest"

import { decodeId, encodeId } from "@/lib/uuid"

describe("lib/uuid", () => {
	test("encodes and decodes model ids", () => {
		const encoded = encodeId("circle", 42)
		expect(decodeId(encoded)).toEqual({ model: "circle", id: "42" })
	})
})
