import React from "react"
import { afterAll, beforeAll, vi } from "vitest"

const inertiaPageProps = {
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
	active_circle: undefined,
	active_theme: undefined,
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
			on: vi.fn(() => vi.fn()),
		},
		Head: ({ children }: { children?: React.ReactNode }) => {
			return React.createElement(React.Fragment, null, children)
		},
		Link: ({ children, href }: { children?: React.ReactNode, href?: string }) => {
			return React.createElement("a", { href: href ?? "#" }, children)
		},
		usePage: () => {
			return { props: inertiaPageProps }
		},
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

beforeAll(async() => {
	return
})

afterAll(() => {
	return
})

