import { screen } from "@testing-library/react"
import { describe, test } from "vitest"

import { CreatePresentationFromTemplateModalContent } from "@/domains/templates/CreatePresentationFromTemplateModal/CreatePresentationFromTemplateModalContent"
import { createCirclesOptions, createTemplatesIndex } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/templates/CreatePresentationFromTemplateModal", () => {
	test("renders theme and name fields for creating a presentation", () => {
		const circle = createCirclesOptions()
		const template = createTemplatesIndex()

		render(
			<CreatePresentationFromTemplateModalContent
				template={ template }
				themes={ [{
					id: "theme-1",
					circle,
					name: "Theme 1",
					slug: "theme-1",
					status: "current",
				}] }
				circleSlug={ circle.slug }
			/>,
		)

		screen.getByRole("combobox")
		screen.getByLabelText("Presentation name")
		screen.getByDisplayValue("Template 1 Presentation")
		screen.getByDisplayValue("Theme 1")
	})
})
