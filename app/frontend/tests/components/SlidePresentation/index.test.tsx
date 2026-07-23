import { screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import { SlidePresentation } from "@/components/SlidePresentation"
import { PresentationDataProvider } from "@/features/presentation"
import {
	createCirclePersisted,
	createPresentationOrgPersisted,
	createPresentationPresentation,
	createSlideData,
	createSlidePresentation,
	createThemePersisted,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

function createSlideWithHeading(title: string) {
	return createSlideData({
		content: [
			{
				type: "Heading",
				props: {
					id: "heading-1",
					title,
					padding: 16,
					order: 1,
					color: "#ffffff",
					alignment: "left",
				},
			},
		],
	})
}

describe("components/SlidePresentation", () => {
	test("renders without crashing when active slide data is null", () => {
		const theme = createThemePersisted()
		const circle = createCirclePersisted()
		const presentation = createPresentationPresentation()
		const activeSlide = {
			...createSlidePresentation(),
			data: null,
		}

		const { container } = render(
			<PresentationDataProvider value={ { circle, theme, presentation } }>
				<SlidePresentation
					presentation={ presentation }
					circle={ circle }
					theme={ theme }
					activeSlide={ activeSlide }
					transitionType="none"
					transitionDuration={ 0 }
				/>
			</PresentationDataProvider>,
		)

		expect(container.firstChild).toBeTruthy()
	})

	test("resolves theme tags when presentation context is provided", () => {
		const theme = createThemePersisted({ name: "Allocation Night Theme" })
		const circle = createCirclePersisted({ name: "Battery Powered" })
		const presentation = createPresentationPresentation()
		const activeSlide = createSlidePresentation({
			data: createSlideWithHeading("#theme.name"),
		})

		render(
			<PresentationDataProvider value={ { circle, theme, presentation } }>
				<SlidePresentation
					presentation={ presentation }
					circle={ circle }
					theme={ theme }
					activeSlide={ activeSlide }
					transitionType="none"
					transitionDuration={ 0 }
				/>
			</PresentationDataProvider>,
		)

		expect(screen.getByText("Allocation Night Theme")).toBeInTheDocument()
	})

	test("renders org iterator content with resolved org names", () => {
		const org = createPresentationOrgPersisted({ id: "org-1", name: "River Conservancy" })
		const theme = createThemePersisted({ name: "Theme" })
		const circle = createCirclePersisted()
		const presentation = createPresentationPresentation({ orgs: [org] })
		const activeSlide = createSlidePresentation({
			data: createSlideData({
				content: [
					{
						type: "OrgsIterator",
						props: {
							id: "iterator-1",
							content: [
								{
									type: "Card",
									props: {
										id: "card-1",
										title: "#presentation.org[].name",
										description: "",
										backgroundColor: "#008000",
										fontColor: "#ffffff",
										flex: {
											display: "flex",
											flexDirection: "column",
											flexWrap: "nowrap",
											overflow: "visible",
										},
									},
								},
							],
						},
					},
				],
			}),
		})

		render(
			<PresentationDataProvider value={ { circle, theme, presentation } }>
				<SlidePresentation
					presentation={ presentation }
					circle={ circle }
					theme={ theme }
					activeSlide={ activeSlide }
					transitionType="none"
					transitionDuration={ 0 }
				/>
			</PresentationDataProvider>,
		)

		expect(screen.getByText("River Conservancy")).toBeInTheDocument()
	})
})
