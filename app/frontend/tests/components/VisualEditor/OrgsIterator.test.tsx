import { type PuckContext, type SlotComponent } from "@puckeditor/core"
import { screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"

import * as classes from "@/components/VisualEditor/components/OrgsIterator/OrgsIterator.css"
import * as editorClasses from "@/components/VisualEditor/components/OrgsIterator/OrgsIterator.editor.css"
import { OrgsIteratorDisplay } from "@/components/VisualEditor/components/OrgsIterator/OrgsIteratorDisplay"
import { OrgsIteratorEditor } from "@/components/VisualEditor/components/OrgsIterator/OrgsIteratorEditor"
import { orgsIteratorConfig } from "@/components/VisualEditor/components/OrgsIterator/orgsIteratorConfig"
import { PresentationDataProvider } from "@/features/presentation"
import {
	createCirclePersisted,
	createPresentationOrgPersisted,
	createPresentationPresentation,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

const StubSlot: SlotComponent = (props) => {
	return (
		<div className={ props?.className } data-testid="org-slot">
			slot
		</div>
	)
}

function editorPuck(dragRef: PuckContext["dragRef"]): PuckContext {
	return {
		renderDropZone: () => null,
		metadata: {},
		isEditing: true,
		dragRef,
	}
}

describe("components/VisualEditor/OrgsIterator", () => {
	test("config is inline so Puck does not wrap the editor host", () => {
		expect(orgsIteratorConfig.inline).toBe(true)
	})

	test("display repeats the slot once per org without an outer layout wrapper", () => {
		const presentation = createPresentationPresentation({
			orgs: [
				createPresentationOrgPersisted({ id: "org-1", name: "River Conservancy" }),
				createPresentationOrgPersisted({ id: "org-2", name: "Coastal Trust" }),
			],
		})

		render(
			<PresentationDataProvider
				value={ {
					circle: createCirclePersisted(),
					presentation,
				} }
			>
				<div data-testid="iterator-parent">
					<OrgsIteratorDisplay content={ StubSlot } />
				</div>
			</PresentationDataProvider>,
		)

		const parent = screen.getByTestId("iterator-parent")
		const slots = screen.getAllByTestId("org-slot")

		expect(slots).toHaveLength(2)
		expect(parent.children).toHaveLength(2)
		expect(parent.children[0]).toBe(slots[0])
		expect(parent.children[1]).toBe(slots[1])
		expect(slots[0]?.className).toContain(classes.orgIteratorItem)
		expect(slots[1]?.className).toContain(classes.orgIteratorItem)
	})

	test("display renders nothing when there are no orgs", () => {
		const presentation = createPresentationPresentation({ orgs: [] })

		render(
			<PresentationDataProvider
				value={ {
					circle: createCirclePersisted(),
					presentation,
				} }
			>
				<div data-testid="iterator-parent">
					<OrgsIteratorDisplay content={ StubSlot } />
				</div>
			</PresentationDataProvider>,
		)

		expect(screen.queryByTestId("org-slot")).not.toBeInTheDocument()
		expect(screen.getByTestId("iterator-parent").children).toHaveLength(0)
	})

	test("editor keeps a real host with the slot and repeat hint", () => {
		const dragRef = vi.fn()

		render(
			<OrgsIteratorEditor
				content={ StubSlot }
				puck={ editorPuck(dragRef) }
			/>,
		)

		const hint = screen.getByText("Repeats for each organization")
		const host = hint.parentElement
		const slot = screen.getByTestId("org-slot")

		expect(host).toBeTruthy()
		expect(host?.className).toContain(editorClasses.editor)
		expect(host?.className).not.toContain(classes.orgIteratorItem)
		expect(slot).toBeInTheDocument()
		expect(host?.contains(slot)).toBe(true)
		expect(dragRef).toHaveBeenCalled()
	})
})
