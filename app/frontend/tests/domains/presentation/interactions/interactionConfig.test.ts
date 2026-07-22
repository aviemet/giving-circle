import { describe, expect, it } from "vitest"

import {
	interactionConfigFrom,
	isInteractionConfig,
} from "@/domains/presentation/interactions/Form/interactionConfig"
import { interactionFormContextFrom, responseDataFrom } from "@/domains/presentation/interactions/Form/ResponseFields"

describe("interaction config helpers", () => {
	it("recognizes valid interaction config", () => {
		const config = {
			fields: [{ key: "note", type: "text", label: "Note" }],
			outputs: [],
		}

		expect(isInteractionConfig(config)).toBe(true)
		expect(interactionConfigFrom(config).fields).toHaveLength(1)
	})

	it("returns blank config for invalid values", () => {
		expect(interactionConfigFrom(null)).toEqual({ fields: [], outputs: [] })
	})

	it("normalizes form context from loose values", () => {
		expect(interactionFormContextFrom(null)).toEqual({})
		expect(interactionFormContextFrom({ choices: { color: ["red", "blue"] } })).toEqual({
			choices: { color: ["red", "blue"] },
		})
	})

	it("normalizes response data from loose values", () => {
		expect(responseDataFrom(null)).toEqual({})
		expect(responseDataFrom({ note: "hello" })).toEqual({ note: "hello" })
	})
})
