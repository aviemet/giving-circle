import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, test, vi } from "vitest"

const performMock = vi.fn()
const sendMock = vi.fn()
let receivedHandler: ((data: unknown) => void) | undefined
let connectedHandler: (() => void) | undefined
let disconnectedHandler: (() => void) | undefined

vi.mock("@/lib/hooks/useActionCable", () => ({
	useActionCable: (options: {
		onReceived?: (data: unknown) => void
		onConnected?: () => void
		onDisconnected?: () => void
	}) => {
		receivedHandler = options.onReceived
		connectedHandler = options.onConnected
		disconnectedHandler = options.onDisconnected
		return { perform: performMock, send: sendMock }
	},
}))

vi.mock("@/pages/Presentations/Active/useActivePresentationChannel", async (importOriginal) => {
	return await importOriginal()
})

import { useActivePresentationChannel } from "@/pages/Presentations/Active/useActivePresentationChannel"

describe("pages/Presentations/Active/useActivePresentationChannel", () => {
	beforeEach(() => {
		performMock.mockClear()
		sendMock.mockClear()
		receivedHandler = undefined
		connectedHandler = undefined
		disconnectedHandler = undefined
	})

	test("handles channel messages and perform helpers", () => {
		const onSlideSwitched = vi.fn()
		const onSlideUpdated = vi.fn()
		const onActivePresentationUpdated = vi.fn()
		const onConnected = vi.fn()
		const onDisconnected = vi.fn()

		const { result } = renderHook(() => useActivePresentationChannel({
			presentationId: "pres-1",
			onSlideSwitched,
			onSlideUpdated,
			onActivePresentationUpdated,
			onConnected,
			onDisconnected,
		}))

		act(() => {
			receivedHandler?.({ type: "slide_switched", active_slide: "slide-2" })
			receivedHandler?.({ type: "slide_updated", slide_id: "slide-2", content: "{}" })
			receivedHandler?.({
				type: "active_presentation_updated",
				active_presentation: { interactions: [] },
			})
			connectedHandler?.()
			disconnectedHandler?.()
		})

		expect(onSlideSwitched).toHaveBeenCalledWith("slide-2")
		expect(onSlideUpdated).toHaveBeenCalledWith("slide-2", "{}")
		expect(onActivePresentationUpdated).toHaveBeenCalledWith({ interactions: [] })
		expect(onConnected).toHaveBeenCalled()
		expect(onDisconnected).toHaveBeenCalled()

		result.current.switchSlide("slide-3")
		result.current.updateSlide("slide-3", "{\"a\":1}")
		expect(performMock).toHaveBeenCalledWith("switch_slide", {
			presentation_id: "pres-1",
			slide_id: "slide-3",
		})
		expect(performMock).toHaveBeenCalledWith("update_slide", {
			presentation_id: "pres-1",
			slide_id: "slide-3",
			content: "{\"a\":1}",
		})
	})
})
