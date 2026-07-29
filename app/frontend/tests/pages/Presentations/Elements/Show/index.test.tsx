import { describe, test } from "vitest"

import ShowPresentationElement from "@/pages/Presentations/Elements/Show"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Elements/Show", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders element show", () => {
		const presentation_element: Schema.PresentationElementsShow = {
			id: "element-1",
			data: {},
			name: "Element 1",
			presentations: [],
			slug: "element-1",
			template: false,
		}

		render(<ShowPresentationElement presentation_element={ presentation_element } />)
	})
})
