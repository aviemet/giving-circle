import { waitFor } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import PublicShowPresentation from "@/pages/Presentations/Active/PublicShow"
import { createCirclePersisted, createPresentationPresentation, createThemePersisted } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Active/PublicShow/index", () => {
	test("renders public presentation", async() => {
		const presentation = createPresentationPresentation()
		const circle = createCirclePersisted()

		const { container } = render(
			<PublicShowPresentation
				presentation={ presentation }
				circle={ circle }
				theme={ createThemePersisted() }
			/>,
		)

		await waitFor(() => {
			expect(container.querySelector("div")).toBeTruthy()
		})
	})
})
