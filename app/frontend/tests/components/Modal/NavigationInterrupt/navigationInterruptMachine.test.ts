import { describe, expect, test } from "vitest"
import { createActor } from "xstate"

import {
	navigationInterruptMachine,
	parseInertiaVisitUrl,
} from "@/components/Modal/NavigationInterrupt/navigationInterruptMachine"

describe("components/Modal/NavigationInterrupt/navigationInterruptMachine", () => {
	test("parseInertiaVisitUrl normalizes URL values", () => {
		expect(parseInertiaVisitUrl("https://example.com/slides")).toBe("https://example.com/slides")
		expect(parseInertiaVisitUrl(new URL("https://example.com/edit"))).toBe("https://example.com/edit")
	})

	test("REQUEST_INTERRUPT opens the prompt and stores pending navigation", () => {
		const actor = createActor(navigationInterruptMachine)
		actor.start()

		actor.send({
			type: "REQUEST_INTERRUPT",
			pending: { type: "visit", url: "/slides" },
		})

		expect(actor.getSnapshot().matches("prompting")).toBe(true)
		expect(actor.getSnapshot().context.pending).toEqual({ type: "visit", url: "/slides" })
	})

	test("REQUEST_INTERRUPT replaces the pending destination while prompting", () => {
		const actor = createActor(navigationInterruptMachine)
		actor.start()

		actor.send({
			type: "REQUEST_INTERRUPT",
			pending: { type: "visit", url: "/first" },
		})

		actor.send({
			type: "REQUEST_INTERRUPT",
			pending: { type: "visit", url: "/second" },
		})

		expect(actor.getSnapshot().matches("prompting")).toBe(true)
		expect(actor.getSnapshot().context.pending).toEqual({ type: "visit", url: "/second" })
	})

	test("STAY closes the prompt without leaving", () => {
		const actor = createActor(navigationInterruptMachine)
		actor.start()

		actor.send({
			type: "REQUEST_INTERRUPT",
			pending: { type: "historyBack" },
		})

		actor.send({ type: "STAY" })

		expect(actor.getSnapshot().matches("idle")).toBe(true)
		expect(actor.getSnapshot().context.pending).toBeNull()
		expect(actor.getSnapshot().context.bypass).toBe(false)
	})

	test("PREPARE_LEAVE clears pending navigation and enables bypass", () => {
		const actor = createActor(navigationInterruptMachine)
		actor.start()

		actor.send({
			type: "REQUEST_INTERRUPT",
			pending: { type: "visit", url: "/slides" },
		})

		actor.send({ type: "PREPARE_LEAVE" })

		expect(actor.getSnapshot().matches("idle")).toBe(true)
		expect(actor.getSnapshot().context.pending).toBeNull()
		expect(actor.getSnapshot().context.bypass).toBe(true)
	})

	test("CONSUME_BYPASS clears bypass after a guarded navigation completes", () => {
		const actor = createActor(navigationInterruptMachine)
		actor.start()

		actor.send({ type: "SET_BYPASS" })
		actor.send({ type: "CONSUME_BYPASS" })

		expect(actor.getSnapshot().context.bypass).toBe(false)
	})
})
