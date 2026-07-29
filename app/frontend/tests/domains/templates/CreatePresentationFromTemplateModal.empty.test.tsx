import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { CreatePresentationFromTemplateModalContent } from "@/domains/templates/CreatePresentationFromTemplateModal/CreatePresentationFromTemplateModalContent"
import { createCirclesOptions, createTemplatesIndex } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/templates/CreatePresentationFromTemplateModal empty themes", () => {
	test("prompts to create a theme when none exist", () => {
		const circle = createCirclesOptions()

		render(
			<CreatePresentationFromTemplateModalContent
				template={ createTemplatesIndex() }
				themes={ [] }
				circleSlug={ circle.slug }
			/>,
		)

		expect(screen.getByText(/no themes yet/i)).toBeTruthy()
		expect(screen.getByRole("link", { name: /new theme/i })).toBeTruthy()
	})
})
