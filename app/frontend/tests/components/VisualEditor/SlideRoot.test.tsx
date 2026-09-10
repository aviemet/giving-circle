import { type PuckContext, Render } from "@puckeditor/core"
import { screen } from "@testing-library/react"
import clsx from "clsx"
import { describe, expect, test, vi } from "vitest"

import { config } from "@/components/VisualEditor/config"
import { defaultFlexValue, type FlexProps } from "@/components/VisualEditor/fields/flex"
import { defaultFontValue } from "@/components/VisualEditor/fields/font"
import { SlideRoot } from "@/components/VisualEditor/lib/SlideRoot"
import * as slideRootClasses from "@/components/VisualEditor/lib/SlideRoot/SlideRoot.css"
import { PresentationDataProvider } from "@/features/presentation"
import {
	createCirclePersisted,
	createPresentationPresentation,
	createThemePersisted,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

function puckContext(isEditing: boolean): PuckContext {
	return {
		renderDropZone: () => null,
		metadata: {},
		isEditing,
		dragRef: vi.fn(),
	}
}

function renderSlideRoot({
	isEditing,
	childClassName,
	flex = defaultFlexValue(),
}: {
	isEditing: boolean
	childClassName?: string
	flex?: FlexProps
}) {
	return render(
		<SlideRoot
			title="Slide"
			flex={ flex }
			font={ defaultFontValue() }
			puck={ puckContext(isEditing) }
		>
			<div data-testid="root-zone" className={ clsx(childClassName) }>zone</div>
		</SlideRoot>,
	)
}

describe("components/VisualEditor/components/SlideRoot", () => {
	test("live root zone uses display contents so Page flex applies to children", () => {
		renderSlideRoot({ isEditing: false, childClassName: "existing-zone" })

		const zone = screen.getByTestId("root-zone")
		expect(zone.className).toContain("existing-zone")
		expect(zone.className).toContain(slideRootClasses.rootZoneContents)
	})

	test("editor root zone stays a real box for dropping", () => {
		renderSlideRoot({ isEditing: true, childClassName: "existing-zone" })

		const zone = screen.getByTestId("root-zone")
		expect(zone.className).toContain("existing-zone")
		expect(zone.className).not.toContain(slideRootClasses.rootZoneContents)
	})

	test("flex styles are on SlideRoot, not a child wrapper", () => {
		const flex = {
			...defaultFlexValue(),
			flexDirection: "row" as const,
			justifyContent: "center" as const,
			alignItems: "center" as const,
		}

		renderSlideRoot({ isEditing: false, flex })

		const root = document.querySelector("[data-slide-snapshot-root]")
		expect(root).toHaveStyle({
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
		})
	})

	test("Puck Render collapses the root DropZone so top-level blocks sit in Page flex", () => {
		const circle = createCirclePersisted()
		const theme = createThemePersisted()
		const presentation = createPresentationPresentation()

		render(
			<PresentationDataProvider value={ { circle, theme, presentation } }>
				<Render
					config={ config }
					data={ {
						content: [
							{
								type: "Heading",
								props: {
									id: "heading-1",
									title: "First block",
									alignment: "left",
								},
							},
							{
								type: "Heading",
								props: {
									id: "heading-2",
									title: "Second block",
									alignment: "left",
								},
							},
						],
						root: {
							props: {
								title: "Slide",
								flex: {
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									gap: 16,
								},
							},
						},
					} }
					metadata={ {} }
				/>
			</PresentationDataProvider>,
		)

		const root = document.querySelector("[data-slide-snapshot-root]")
		expect(root).toBeTruthy()
		expect(root?.firstElementChild?.className).toContain(slideRootClasses.rootZoneContents)
		expect(screen.getByText("First block")).toBeInTheDocument()
		expect(screen.getByText("Second block")).toBeInTheDocument()
	})
})
