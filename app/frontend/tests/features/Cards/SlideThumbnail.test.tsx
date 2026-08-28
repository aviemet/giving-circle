import { describe, expect, test } from "vitest"

import { SlideThumbnail } from "@/features/Cards"
import { render } from "@/tests/helpers/utils"

describe("features/Cards/SlideThumbnail", () => {
	test("renders the attached thumbnail", () => {
		const { container } = render(
			<SlideThumbnail
				alt=""
				src="/rails/active_storage/blobs/redirect/signed/thumb.jpg"
			/>,
		)

		const image = container.querySelector("img")
		expect(image?.getAttribute("src")).toBe("/rails/active_storage/blobs/redirect/signed/thumb.jpg")
	})

	test("falls back to the placeholder when no thumbnail is attached", () => {
		const { container } = render(
			<SlideThumbnail alt="" />,
		)

		const image = container.querySelector("img")
		expect(image?.getAttribute("src")).toBeTruthy()
		expect(image?.getAttribute("src")).not.toContain("mantinedev")
	})
})
