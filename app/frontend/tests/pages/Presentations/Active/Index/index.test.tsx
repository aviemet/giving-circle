import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import ActivePresentationControls from "@/pages/Presentations/Active/Index"
import { createPresentationsShow } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

vi.mock("@/pages/Presentations/Active/useActivePresentationChannel", () => ({
	useActivePresentationChannel: () => ({
		switchSlide: vi.fn(),
	}),
}))

vi.mock("@/queries", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/queries")>()
	return {
		...actual,
		useTogglePresentationInteraction: () => ({
			mutate: vi.fn(),
			isPending: false,
		}),
	}
})

describe("pages/Presentations/Active/Index/index", () => {
	test("renders slides and interaction toggles", () => {
		inertiaPageProps.params = {
			circle_slug: "circle-1",
			theme_slug: "theme-1",
			presentation_slug: "presentation-1",
		}

		const presentation = createPresentationsShow({
			slides: [
				{
					id: "slide-1",
					slug: "slide-1",
					title: "Slide 1",
					data: { content: [], root: { props: { title: "Slide" } } },
				},
			],
			slides_count: 1,
		})

		render(
			<ActivePresentationControls
				presentation={ presentation }
				interactions={ [
					{
						id: "interaction-1",
						slug: "allocation",
						name: "Allocation Round",
						accepting_responses: false,
					},
				] }
			/>,
		)

		expect(screen.getByText("Slide 1")).toBeTruthy()
		expect(screen.getByRole("switch", { name: "Allocation Round" })).toBeTruthy()
	})
})
