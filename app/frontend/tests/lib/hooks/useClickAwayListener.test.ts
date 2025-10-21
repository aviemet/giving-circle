import { renderHook } from "@testing-library/react"
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest"

import { useClickAwayListener } from "@/lib/hooks/useClickAwayListener"

describe("useClickAwayListener", () => {
	let ref: React.RefObject<HTMLDivElement>
	let element: HTMLDivElement
	let outsideElement: HTMLDivElement

	beforeEach(() => {
		element = document.createElement("div")
		outsideElement = document.createElement("div")
		document.body.appendChild(element)
		document.body.appendChild(outsideElement)
		ref = { current: element }
	})

	afterEach(() => {
		document.body.removeChild(element)
		document.body.removeChild(outsideElement)
	})

	describe("mousedown events", () => {
		test("calls callback when clicking outside the ref element", () => {
			const callback = vi.fn()
			renderHook(() => useClickAwayListener(ref, callback))

			outsideElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))

			expect(callback).toHaveBeenCalledTimes(1)
		})

		test("does not call callback when clicking inside the ref element", () => {
			const callback = vi.fn()
			renderHook(() => useClickAwayListener(ref, callback))

			element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))

			expect(callback).not.toHaveBeenCalled()
		})

		test("does not call callback when clicking on child elements", () => {
			const callback = vi.fn()
			const child = document.createElement("span")
			element.appendChild(child)

			renderHook(() => useClickAwayListener(ref, callback))

			child.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))

			expect(callback).not.toHaveBeenCalled()

			element.removeChild(child)
		})

		test("does not call callback when ref is null", () => {
			const callback = vi.fn()
			const nullRef = { current: null } as unknown as React.RefObject<HTMLDivElement>
			renderHook(() => useClickAwayListener(nullRef, callback))

			outsideElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))

			expect(callback).not.toHaveBeenCalled()
		})
	})

	describe("keyboard events", () => {
		test("calls callback when pressing Escape key", () => {
			const callback = vi.fn()
			renderHook(() => useClickAwayListener(ref, callback))

			document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))

			expect(callback).toHaveBeenCalledTimes(1)
		})

		test("does not call callback when pressing other keys", () => {
			const callback = vi.fn()
			renderHook(() => useClickAwayListener(ref, callback))

			document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }))
			document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }))
			document.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }))

			expect(callback).not.toHaveBeenCalled()
		})
	})

	describe("enabled option", () => {
		test("does not attach listeners when enabled is false", () => {
			const callback = vi.fn()
			renderHook(() => useClickAwayListener(ref, callback, { enabled: false }))

			outsideElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))
			document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))

			expect(callback).not.toHaveBeenCalled()
		})

		test("attaches listeners when enabled changes from false to true", () => {
			const callback = vi.fn()
			const { rerender } = renderHook(
				({ enabled }) => useClickAwayListener(ref, callback, { enabled }),
				{ initialProps: { enabled: false } },
			)

			outsideElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))
			expect(callback).not.toHaveBeenCalled()

			rerender({ enabled: true })

			outsideElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))
			expect(callback).toHaveBeenCalledTimes(1)
		})

		test("removes listeners when enabled changes from true to false", () => {
			const callback = vi.fn()
			const { rerender } = renderHook(
				({ enabled }) => useClickAwayListener(ref, callback, { enabled }),
				{ initialProps: { enabled: true } },
			)

			outsideElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))
			expect(callback).toHaveBeenCalledTimes(1)

			rerender({ enabled: false })

			outsideElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))
			expect(callback).toHaveBeenCalledTimes(1)
		})
	})

	describe("custom event handlers", () => {
		test("calls onMouseDown instead of callback when provided", () => {
			const callback = vi.fn()
			const onMouseDown = vi.fn()
			renderHook(() => useClickAwayListener(ref, callback, { onMouseDown }))

			outsideElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))

			expect(onMouseDown).toHaveBeenCalledTimes(1)
			expect(callback).not.toHaveBeenCalled()
		})

		test("calls onEscape instead of callback when provided", () => {
			const callback = vi.fn()
			const onEscape = vi.fn()
			renderHook(() => useClickAwayListener(ref, callback, { onEscape }))

			document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))

			expect(onEscape).toHaveBeenCalledTimes(1)
			expect(callback).not.toHaveBeenCalled()
		})

		test("can use different handlers for mouse and escape", () => {
			const callback = vi.fn()
			const onMouseDown = vi.fn()
			const onEscape = vi.fn()
			renderHook(() => useClickAwayListener(ref, callback, { onMouseDown, onEscape }))

			outsideElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))
			document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))

			expect(onMouseDown).toHaveBeenCalledTimes(1)
			expect(onEscape).toHaveBeenCalledTimes(1)
			expect(callback).not.toHaveBeenCalled()
		})
	})

	describe("cleanup", () => {
		test("removes event listeners on unmount", () => {
			const callback = vi.fn()
			const { unmount } = renderHook(() => useClickAwayListener(ref, callback))

			unmount()

			outsideElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))
			document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))

			expect(callback).not.toHaveBeenCalled()
		})
	})

	describe("callback updates", () => {
		test("uses latest callback without recreating listeners", () => {
			const callback1 = vi.fn()
			const callback2 = vi.fn()

			const { rerender } = renderHook(
				({ callback }) => useClickAwayListener(ref, callback),
				{ initialProps: { callback: callback1 } },
			)

			outsideElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))
			expect(callback1).toHaveBeenCalledTimes(1)
			expect(callback2).not.toHaveBeenCalled()

			rerender({ callback: callback2 })

			outsideElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))
			expect(callback1).toHaveBeenCalledTimes(1)
			expect(callback2).toHaveBeenCalledTimes(1)
		})
	})
})

