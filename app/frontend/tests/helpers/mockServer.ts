import "@testing-library/jest-dom/vitest"
import { type Errors, type ErrorBag } from "@inertiajs/core"
import { setupServer } from "msw/node"
import React from "react"
import { afterAll, afterEach, beforeAll, vi } from "vitest"

import { handlers } from "./handlers"

const server = setupServer(...handlers)

const TestInertiaFormContext = React.createContext<Record<string, unknown> | undefined>(undefined)

interface TestInertiaPageProps {
	auth: {
		user: {
			id: string
			active: boolean
			email: string
			slug: string
		}
	}
	flash: {
		notice: null
		alert: null
	}
	errors: Errors & ErrorBag
	active_circle?: Schema.CirclesInertiaShare
	active_theme?: Schema.ThemesInertiaShare
	active_presentation?: Schema.PresentationsInertiaShare
	circles?: Schema.CirclesInertiaShare[]
	params: Record<string, string>
}

export const inertiaPageProps: TestInertiaPageProps = {
	auth: {
		user: {
			id: "user-1",
			active: true,
			email: "user@example.com",
			slug: "user-1",
		},
	},
	flash: {
		notice: null,
		alert: null,
	},
	errors: {},
	active_presentation: undefined,
	circles: undefined,
	params: {
		circle_slug: "circle-1",
		theme_slug: "theme-1",
		presentation_slug: "presentation-1",
		slug: "slug-1",
		id: "id-1",
	},
}

vi.mock("@inertiajs/react", () => {
	return {
		router: {
			get: vi.fn(),
			post: vi.fn(),
			put: vi.fn(),
			patch: vi.fn(),
			delete: vi.fn(),
			reload: vi.fn(),
			visit: vi.fn(),
		},
		Head: ({ children, title }: { children?: React.ReactNode, title?: string }) => {
			return React.createElement(
				"div",
				{ "data-testid": "inertia-head", "data-title": title ?? "" },
				children,
			)
		},
		Link: ({ children, href }: { children?: React.ReactNode, href?: string }) => {
			return React.createElement("a", { href: href ?? "#" }, children)
		},
		usePage: () => {
			return { props: inertiaPageProps }
		},
		Form: ({
			children,
			action,
			method,
		}: {
			children?: React.ReactNode | ((props: Record<string, unknown>) => React.ReactNode)
			action?: string
			method?: string
		}) => {
			const slotProps = {
				errors: {},
				hasErrors: false,
				processing: false,
				progress: null,
				wasSuccessful: false,
				recentlySuccessful: false,
				isDirty: false,
				validating: false,
				clearErrors: vi.fn(),
				resetAndClearErrors: vi.fn(),
				setError: vi.fn(),
				reset: vi.fn(),
				submit: vi.fn(),
				defaults: vi.fn(),
				getData: vi.fn(() => ({})),
				getFormData: vi.fn(() => new FormData()),
				valid: vi.fn(() => true),
				invalid: vi.fn(() => false),
				validate: vi.fn(),
				touch: vi.fn(),
				touched: vi.fn(() => false),
				validator: vi.fn(() => ({})),
			}

			const formBody = typeof children === "function" ? children(slotProps) : children

			return React.createElement(
				TestInertiaFormContext.Provider,
				{ value: slotProps },
				React.createElement(
					"form",
					{
						action,
						method,
						onSubmit: (event: Event) => event.preventDefault(),
					},
					formBody,
				),
			)
		},
		useFormContext: () => React.useContext(TestInertiaFormContext),
	}
})

vi.mock("@/lib/hooks/useActivePresentationChannel", () => {
	return {
		useActivePresentationChannel: () => {
			return { switchSlide: vi.fn() }
		},
	}
})

if(!("BroadcastChannel" in globalThis)) {
	class BroadcastChannelMock {
		name: string
		onmessage: ((event: MessageEvent) => void) | null = null
		onmessageerror: ((event: MessageEvent) => void) | null = null
		constructor(name: string) {
			this.name = name
		}
		postMessage(_message: unknown) {}
		close() {}
		addEventListener(_type: string, _listener: EventListenerOrEventListenerObject) {}
		removeEventListener(_type: string, _listener: EventListenerOrEventListenerObject) {}
		dispatchEvent(_event: Event) { return true }
	}
	globalThis.BroadcastChannel = BroadcastChannelMock
}

if(typeof window.matchMedia !== "function") {
	window.matchMedia = (_query: string) => {
		return {
			matches: false,
			media: "",
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		}
	}
}

if(!("ResizeObserver" in globalThis)) {
	class ResizeObserverMock {
		observe(_target: Element) {}
		unobserve(_target: Element) {}
		disconnect() {}
	}

	Object.defineProperty(globalThis, "ResizeObserver", {
		value: ResizeObserverMock,
		writable: true,
		configurable: true,
	})
}

beforeAll(() => {
	if(!document.getElementById("footer-portal")) {
		const footerPortal = document.createElement("div")
		footerPortal.id = "footer-portal"
		document.body.append(footerPortal)
	}
	server.listen()
})
afterEach(() => {
	inertiaPageProps.active_circle = undefined
	inertiaPageProps.active_theme = undefined
	inertiaPageProps.active_presentation = undefined
	inertiaPageProps.circles = undefined
	server.resetHandlers()
})
afterAll(() => server.close())
