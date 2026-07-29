import { describe, expect, test, vi } from "vitest"

const createMock = vi.fn(() => ({ unsubscribe: vi.fn() }))

vi.mock("@rails/actioncable", () => ({
	createConsumer: () => ({
		subscriptions: {
			create: createMock,
		},
	}),
}))

describe("lib/actioncable", () => {
	test("createChannel subscribes with channel name and params", async () => {
		const { createChannel } = await import("@/lib/actioncable")
		const callbacks = {
			connected: () => undefined,
			received: () => undefined,
			disconnected: () => undefined,
		}
		createChannel("PresentationChannel", callbacks, { id: "1" })
		expect(createMock).toHaveBeenCalledWith(
			{ channel: "PresentationChannel", id: "1" },
			callbacks,
		)
	})
})
