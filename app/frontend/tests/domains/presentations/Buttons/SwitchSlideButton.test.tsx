import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import { SwitchSlideButton } from "@/domains/presentations/Buttons/SwitchSlideButton"
import { createSlideData } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/presentations/Buttons/SwitchSlideButton", () => {
	test("renders slide title and handles click", async () => {
		const user = userEvent.setup()
		const onClick = vi.fn()
		render(
			<SwitchSlideButton
				active
				onClick={ onClick }
				slide={ {
					id: "slide-1",
					slug: "slide-1",
					title: "Opening",
					data: createSlideData(),
				} }
			/>,
		)
		screen.getByText("Opening")
		await user.click(screen.getByText("Opening"))
		expect(onClick).toHaveBeenCalled()
	})

	test("renders the attached thumbnail", () => {
		const { container } = render(
			<SwitchSlideButton
				active={ false }
				onClick={ () => undefined }
				slide={ {
					id: "slide-1",
					slug: "slide-1",
					title: "Opening",
					data: createSlideData(),
					thumbnail_url: "/rails/active_storage/blobs/redirect/signed/thumb.jpg",
				} }
			/>,
		)

		const image = container.querySelector("img")
		expect(image?.getAttribute("src")).toBe("/rails/active_storage/blobs/redirect/signed/thumb.jpg")
	})

	test("marks the selected slide as active", () => {
		const { container } = render(
			<SwitchSlideButton
				active
				onClick={ () => undefined }
				slide={ {
					id: "slide-1",
					slug: "slide-1",
					title: "Opening",
					data: createSlideData(),
				} }
			/>,
		)

		expect(container.querySelector(".active")).toBeTruthy()
	})

	test("falls back to Untitled Slide", () => {
		render(
			<SwitchSlideButton
				active={ false }
				onClick={ () => undefined }
				slide={ {
					id: "slide-2",
					slug: "slide-2",
					data: createSlideData(),
				} }
			/>,
		)
		screen.getByText("Untitled Slide")
	})
})
