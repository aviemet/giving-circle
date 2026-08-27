import { describe, expect, test } from "vitest"

import { SlideCard } from "@/features/Cards"
import { createSlideData } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("features/Cards/SlideCard", () => {
	test("renders the attached thumbnail", () => {
		const { container } = render(
			<SlideCard
				editHref="/slides/intro/edit"
				slide={ {
					id: "slide-1",
					slug: "intro",
					title: "Intro",
					data: createSlideData(),
					thumbnail_url: "/rails/active_storage/blobs/redirect/signed/thumb.jpg",
				} }
			/>,
		)

		const image = container.querySelector("img")
		expect(image?.getAttribute("src")).toBe("/rails/active_storage/blobs/redirect/signed/thumb.jpg")
	})

	test("falls back to the placeholder when no thumbnail is attached", () => {
		const { container } = render(
			<SlideCard
				editHref="/slides/intro/edit"
				slide={ {
					id: "slide-1",
					slug: "intro",
					title: "Intro",
					data: createSlideData(),
				} }
			/>,
		)

		const image = container.querySelector("img")
		expect(image?.getAttribute("src")).toBeTruthy()
		expect(image?.getAttribute("src")).not.toContain("mantinedev")
	})
})
