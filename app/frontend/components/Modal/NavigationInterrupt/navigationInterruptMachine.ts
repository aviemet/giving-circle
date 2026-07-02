import { type VisitOptions } from "@inertiajs/core"
import { router } from "@inertiajs/react"
import { assign, setup } from "xstate"

export type PendingNavigation =
	| { type: "visit", url: string, options?: VisitOptions }
	| { type: "historyBack" }

export interface NavigationInterruptContext {
	pending: PendingNavigation | null
	bypass: boolean
}

export type NavigationInterruptEvent =
	| { type: "REQUEST_INTERRUPT", pending: PendingNavigation }
	| { type: "STAY" }
	| { type: "PREPARE_LEAVE" }
	| { type: "CONSUME_BYPASS" }
	| { type: "SET_BYPASS" }
	| { type: "VISIT_WITH_BYPASS", url: string, options?: VisitOptions }
	| { type: "BACK_WITH_BYPASS" }

export function parseInertiaVisitUrl(url: string | URL) {
	return typeof url === "string" ? url : url.href
}

export const navigationInterruptMachine = setup({
	types: {
		context: {} as NavigationInterruptContext,
		events: {} as NavigationInterruptEvent,
	},
	actions: {
		assignPending: assign({
			pending: ({ event }) => {
				if(event.type !== "REQUEST_INTERRUPT") {
					return null
				}

				return event.pending
			},
		}),
		clearPending: assign({
			pending: null,
		}),
		enableBypass: assign({
			bypass: true,
		}),
		disableBypass: assign({
			bypass: false,
		}),
		navigatePending: ({ context }) => {
			const pending = context.pending

			if(!pending) {
				return
			}

			if(pending.type === "historyBack") {
				window.history.back()
				return
			}

			router.visit(pending.url, pending.options ?? {})
		},
		visitWithBypass: ({ event }) => {
			if(event.type !== "VISIT_WITH_BYPASS") {
				return
			}

			router.visit(event.url, event.options ?? {})
		},
		navigateBackWithBypass: () => {
			window.history.back()
		},
	},
}).createMachine({
	id: "navigationInterrupt",
	initial: "idle",
	context: {
		pending: null,
		bypass: false,
	},
	states: {
		idle: {
			on: {
				REQUEST_INTERRUPT: {
					target: "prompting",
					actions: "assignPending",
				},
				SET_BYPASS: {
					actions: "enableBypass",
				},
				VISIT_WITH_BYPASS: {
					actions: ["enableBypass", "visitWithBypass"],
				},
				BACK_WITH_BYPASS: {
					actions: ["enableBypass", "navigateBackWithBypass"],
				},
			},
		},
		prompting: {
			on: {
				STAY: {
					target: "idle",
					actions: "clearPending",
				},
				PREPARE_LEAVE: {
					target: "idle",
					actions: ["navigatePending", "clearPending", "enableBypass"],
				},
				REQUEST_INTERRUPT: {
					actions: "assignPending",
				},
			},
		},
	},
	on: {
		CONSUME_BYPASS: {
			actions: "disableBypass",
		},
	},
})
