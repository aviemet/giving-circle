import { describe, test } from "vitest"

import ShowPresentationSlide from "@/pages/Presentations/Slides/Show"
import { createSlideData } from "@/tests/helpers/fixtures"
import { registerActiveCircleAndThemeLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Slides/Show", () => {
	registerActiveCircleAndThemeLifecycle()

	test("renders slide show", () => {
		const presentation_slide: Schema.SlidesShow = {
			id: "slide-1",
			data: createSlideData(),
			slug: "slide-1",
			title: "Slide 1",
		}

		render(<ShowPresentationSlide presentation_slide={ presentation_slide } />)
	})
})
