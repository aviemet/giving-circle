import { MantineProvider } from "@mantine/core"
import { render, screen } from "@testing-library/react"
import { renderHook, act } from "@testing-library/react"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import { ImageDisplay } from "@/components/VisualEditor/components/Image/Image"
import { TextDisplay } from "@/components/VisualEditor/components/Text/Text"
import { OrgsIteratorEditor } from "@/components/VisualEditor/components/OrgsIterator/OrgsIteratorEditor"
import { useLocalCountdown } from "@/components/VisualEditor/elements/Timer/useTimerCountdown"
import { PresentationDataProvider } from "@/features/presentation"
import { createCircleMock, createPresentationPresentation } from "@/tests/helpers/fixtures"

const puckContext = {
	renderDropZone: () => null,
	metadata: {},
	isEditing: false,
	dragRef: null,
}

describe("VisualEditor component smoke", () => {
	test("renders ImageDisplay", () => {
		render(
			<MantineProvider>
				<ImageDisplay
					title="Logo"
					src=""
					alignment="left"
					puck={ puckContext }
				/>
			</MantineProvider>,
		)
	})

	test("renders TextDisplay", () => {
		const circle = createCircleMock()
		render(
			<MantineProvider>
				<PresentationDataProvider value={ {
					circle,
					theme: circle.themes[0],
					presentation: createPresentationPresentation(),
				} }>
					<TextDisplay content="Hello slide" alignment="left" />
				</PresentationDataProvider>
			</MantineProvider>,
		)
		screen.getByText("Hello slide")
	})

	test("renders OrgsIteratorEditor", () => {
		const Content = ({ className }: { className?: string }) => (
			<div className={ className }>slot</div>
		)

		render(
			<MantineProvider>
				<OrgsIteratorEditor content={ Content } />
			</MantineProvider>,
		)
		screen.getByText("Repeats for each organization")
	})
})

describe("useLocalCountdown", () => {
	test("counts down while running", () => {
		vi.useFakeTimers()
		const { result, rerender } = renderHook(
			({ duration, running }: { duration: number, running: boolean }) =>
				useLocalCountdown(duration, running),
			{ initialProps: { duration: 5, running: true } },
		)

		expect(result.current).toBe(5)
		act(() => {
			vi.advanceTimersByTime(1000)
		})
		expect(result.current).toBe(4)

		rerender({ duration: 10, running: false })
		expect(result.current).toBe(10)
		vi.useRealTimers()
	})
})
