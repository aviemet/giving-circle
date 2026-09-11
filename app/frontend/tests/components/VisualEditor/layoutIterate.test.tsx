import { type PuckContext, type SlotComponent } from "@puckeditor/core"
import { screen } from "@testing-library/react"
import clsx from "clsx"
import { describe, expect, test, vi } from "vitest"

import * as containerClasses from "@/components/VisualEditor/components/Container/Container.css"
import * as containerEditorClasses from "@/components/VisualEditor/components/Container/Container.editor.css"
import { containerConfig } from "@/components/VisualEditor/components/Container/containerConfig"
import { ContainerDisplay } from "@/components/VisualEditor/components/Container/ContainerDisplay"
import { ContainerEditor } from "@/components/VisualEditor/components/Container/ContainerEditor"
import * as gridClasses from "@/components/VisualEditor/components/Grid/Grid.css"
import { gridConfig } from "@/components/VisualEditor/components/Grid/gridConfig"
import { GridDisplay } from "@/components/VisualEditor/components/Grid/GridDisplay"
import { GridEditor } from "@/components/VisualEditor/components/Grid/GridEditor"
import { defaultGridLayoutValue } from "@/components/VisualEditor/fields/grid"
import { ITERATE_FINALIST_ORGS, ITERATE_NONE, ITERATE_ORGS, RepeatedSlot } from "@/components/VisualEditor/fields/iterate"
import * as iterateClasses from "@/components/VisualEditor/fields/iterate/iterate.css"
import * as iterateEditorClasses from "@/components/VisualEditor/fields/iterate/iterate.editor.css"
import * as layoutChrome from "@/components/VisualEditor/styles/layoutChrome.editor.css"
import * as puckClasses from "@/components/VisualEditor/styles/Puck.css"
import { PresentationDataProvider } from "@/features/presentation"
import {
	createCirclePersisted,
	createPresentationOrgPersisted,
	createPresentationPresentation,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

const StubSlot: SlotComponent = (props) => {
	return (
		<div className={ clsx(props?.className) } data-testid="layout-slot">
			slot
		</div>
	)
}

function editorPuck(): PuckContext {
	return {
		renderDropZone: () => null,
		metadata: {},
		isEditing: true,
		dragRef: vi.fn(),
	}
}

function livePuck(): PuckContext {
	return {
		renderDropZone: () => null,
		metadata: {},
		isEditing: false,
		dragRef: vi.fn(),
	}
}

function presentationWithOrgs() {
	return createPresentationPresentation({
		orgs: [
			createPresentationOrgPersisted({ id: "org-1", name: "River Conservancy" }),
			createPresentationOrgPersisted({ id: "org-2", name: "Coastal Trust" }),
		],
	})
}

describe("components/VisualEditor/layout iterate", () => {
	test("Container and Grid configs are inline and include Iterate", () => {
		expect(containerConfig.inline).toBe(true)
		expect(gridConfig.inline).toBe(true)
		expect(containerConfig.fields?.iterate).toBeTruthy()
		expect(gridConfig.fields?.iterate).toBeTruthy()
		expect(gridConfig.fields?.grid).toBeTruthy()
		expect(gridConfig.fields).not.toHaveProperty("columns")
		expect(containerConfig.defaultProps?.iterate).toBe(ITERATE_NONE)
		expect(gridConfig.defaultProps?.iterate).toBe(ITERATE_NONE)
		expect(gridConfig.defaultProps?.grid).toEqual(defaultGridLayoutValue())
	})

	test("RepeatedSlot renders one copy per org and nothing when empty", () => {
		const items = [
			createPresentationOrgPersisted({ id: "org-1" }),
			createPresentationOrgPersisted({ id: "org-2" }),
		]

		const { rerender } = render(
			<div data-testid="parent">
				<RepeatedSlot
					content={ StubSlot }
					items={ items }
					pathPrefix="presentation.org"
				/>
			</div>,
		)

		const slots = screen.getAllByTestId("layout-slot")
		expect(slots).toHaveLength(2)
		expect(screen.getByTestId("parent").children).toHaveLength(2)
		expect(slots[0]?.className).toContain(iterateClasses.iterateItem)

		rerender(
			<div data-testid="parent">
				<RepeatedSlot
					content={ StubSlot }
					items={ items }
					pathPrefix="presentation.org"
					className={ clsx(gridClasses.iterateCell) }
				/>
			</div>,
		)

		expect(screen.getAllByTestId("layout-slot")[0]?.className).toContain(gridClasses.iterateCell)
		expect(screen.getAllByTestId("layout-slot")[0]?.className).not.toContain(iterateClasses.iterateItem)

		rerender(
			<div data-testid="parent">
				<RepeatedSlot
					content={ StubSlot }
					items={ [] }
					pathPrefix="presentation.org"
				/>
			</div>,
		)

		expect(screen.queryByTestId("layout-slot")).not.toBeInTheDocument()
		expect(screen.getByTestId("parent").children).toHaveLength(0)
	})

	test("live Container with Iterate on renders one slot per org", () => {
		const { container } = render(
			<PresentationDataProvider
				value={ {
					circle: createCirclePersisted(),
					presentation: presentationWithOrgs(),
				} }
			>
				<div data-testid="parent">
					<ContainerDisplay
						id="container-1"
						content={ StubSlot }
						alignment="left"
						iterate={ ITERATE_ORGS }
						puck={ livePuck() }
						flex={ {
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							overflow: "visible",
						} }
					/>
				</div>
			</PresentationDataProvider>,
		)

		expect(screen.getAllByTestId("layout-slot")).toHaveLength(2)

		const host = container.getElementsByClassName(containerClasses.container)[0]
		expect(host?.className).toContain(containerClasses.container)
		expect(host?.className).not.toContain(containerEditorClasses.container)
		expect(host?.className).not.toContain(puckClasses.presentationSlot)
		expect(host?.className).not.toContain(layoutChrome.frame)
	})

	test("live Container with Iterate on and no orgs renders no slot copies", () => {
		render(
			<PresentationDataProvider
				value={ {
					circle: createCirclePersisted(),
					presentation: createPresentationPresentation({ orgs: [] }),
				} }
			>
				<ContainerDisplay
					id="container-1"
					content={ StubSlot }
					alignment="left"
					iterate={ ITERATE_ORGS }
					flex={ {} }
					puck={ livePuck() }
				/>
			</PresentationDataProvider>,
		)

		expect(screen.queryByTestId("layout-slot")).not.toBeInTheDocument()
	})

	test("editor Container with Iterate on keeps one slot and the hint", () => {
		const { container } = render(
			<PresentationDataProvider
				value={ {
					circle: createCirclePersisted(),
					presentation: presentationWithOrgs(),
					isEditor: true,
				} }
			>
				<ContainerEditor
					id="container-1"
					content={ StubSlot }
					alignment="left"
					iterate={ ITERATE_ORGS }
					flex={ {} }
					puck={ editorPuck() }
				/>
			</PresentationDataProvider>,
		)

		expect(screen.getAllByTestId("layout-slot")).toHaveLength(1)
		expect(screen.getByText("Iterates for each organization")).toBeInTheDocument()

		const host = container.getElementsByClassName(containerClasses.container)[0]
		expect(host?.className).toContain(containerClasses.container)
		expect(host?.className).toContain(containerEditorClasses.container)
		expect(host?.className).toContain(puckClasses.presentationSlot)
		expect(host?.className).toContain(layoutChrome.frame)
		expect(host?.className).toContain(layoutChrome.labelContainer)
	})

	test("live Grid with Iterate on renders one slot per org", () => {
		const { container } = render(
			<PresentationDataProvider
				value={ {
					circle: createCirclePersisted(),
					presentation: presentationWithOrgs(),
				} }
			>
				<GridDisplay
					id="grid-1"
					content={ StubSlot }
					grid={ defaultGridLayoutValue() }
					iterate={ ITERATE_ORGS }
					puck={ livePuck() }
				/>
			</PresentationDataProvider>,
		)

		expect(screen.getAllByTestId("layout-slot")).toHaveLength(2)
		expect(screen.getAllByTestId("layout-slot")[0]?.className).toContain(gridClasses.iterateCell)

		const host = container.querySelector("[data-center-last-row]")
		expect(host?.className).toContain(gridClasses.grid)
		expect(host?.className).not.toContain(puckClasses.presentationSlot)
		expect(host?.className).not.toContain(layoutChrome.frame)
	})

	test("live Grid with last row centered marks the host", () => {
		const { container } = render(
			<PresentationDataProvider
				value={ {
					circle: createCirclePersisted(),
					presentation: presentationWithOrgs(),
				} }
			>
				<GridDisplay
					id="grid-1"
					content={ StubSlot }
					grid={ {
						...defaultGridLayoutValue(),
						centerLastRow: true,
					} }
					iterate={ ITERATE_ORGS }
					puck={ livePuck() }
				/>
			</PresentationDataProvider>,
		)

		expect(container.querySelector("[data-center-last-row='true']")).not.toBeNull()
	})

	test("editor Grid with Iterate on keeps one slot and the hint", () => {
		const { container } = render(
			<PresentationDataProvider
				value={ {
					circle: createCirclePersisted(),
					presentation: presentationWithOrgs(),
					isEditor: true,
				} }
			>
				<GridEditor
					id="grid-1"
					content={ StubSlot }
					grid={ defaultGridLayoutValue() }
					iterate={ ITERATE_ORGS }
					puck={ editorPuck() }
				/>
			</PresentationDataProvider>,
		)

		expect(screen.getAllByTestId("layout-slot")).toHaveLength(1)
		expect(screen.getByText("Iterates for each organization")).toBeInTheDocument()
		expect(screen.getByTestId("layout-slot").className).toContain(iterateEditorClasses.iterateSlot)

		const host = container.querySelector("[data-center-last-row]")
		expect(host?.className).toContain(gridClasses.grid)
		expect(host?.className).toContain(puckClasses.presentationSlot)
		expect(host?.className).toContain(layoutChrome.frame)
		expect(host?.className).toContain(layoutChrome.labelGrid)
	})

	test("live Container with finalist iterate and no vote renders all org slots", () => {
		render(
			<PresentationDataProvider
				value={ {
					circle: createCirclePersisted(),
					presentation: presentationWithOrgs(),
				} }
			>
				<ContainerDisplay
					id="container-1"
					content={ StubSlot }
					alignment="left"
					iterate={ ITERATE_FINALIST_ORGS }
					flex={ {} }
					puck={ livePuck() }
				/>
			</PresentationDataProvider>,
		)

		expect(screen.getAllByTestId("layout-slot")).toHaveLength(2)
	})

	test("editor Container with finalist iterate shows the finalist hint", () => {
		render(
			<PresentationDataProvider
				value={ {
					circle: createCirclePersisted(),
					presentation: presentationWithOrgs(),
					isEditor: true,
				} }
			>
				<ContainerEditor
					id="container-1"
					content={ StubSlot }
					alignment="left"
					iterate={ ITERATE_FINALIST_ORGS }
					flex={ {} }
					puck={ editorPuck() }
				/>
			</PresentationDataProvider>,
		)

		expect(screen.getByText("Iterates for each finalist organization")).toBeInTheDocument()
	})
})
