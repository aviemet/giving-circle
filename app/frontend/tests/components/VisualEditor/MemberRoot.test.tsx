import { type PuckContext } from "@puckeditor/core"
import { screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"

import * as memberRootClasses from "@/components/VisualEditor/components/interaction/MemberRoot/MemberRoot.css"
import { MemberRootDisplay } from "@/components/VisualEditor/components/interaction/MemberRoot/MemberRootDisplay"
import { MemberRootEditor } from "@/components/VisualEditor/components/interaction/MemberRoot/MemberRootEditor"
import { defaultFlexValue } from "@/components/VisualEditor/fields/flex"
import { defaultFontValue } from "@/components/VisualEditor/fields/font"
import * as slideRootClasses from "@/components/VisualEditor/lib/SlideRoot/SlideRoot.css"
import { render } from "@/tests/helpers/utils"

function puckContext(isEditing: boolean): PuckContext {
	return {
		renderDropZone: () => null,
		metadata: {},
		isEditing,
		dragRef: vi.fn(),
	}
}

describe("components/VisualEditor/components/interaction/MemberRoot", () => {
	test("live root shows the title and collapses the DropZone wrapper", () => {
		render(
			<MemberRootDisplay
				title="Vote"
				flex={ defaultFlexValue() }
				font={ defaultFontValue() }
				puck={ puckContext(false) }
			>
				<div data-testid="root-zone">zone</div>
			</MemberRootDisplay>,
		)

		expect(screen.getByText("Vote")).toBeInTheDocument()
		expect(screen.getByTestId("root-zone").className).toContain(slideRootClasses.rootZoneContents)
	})

	test("editor root shows a hint and keeps the DropZone as a real box", () => {
		render(
			<MemberRootEditor
				title="Vote"
				flex={ defaultFlexValue() }
				font={ defaultFontValue() }
				puck={ puckContext(true) }
			>
				<div data-testid="root-zone">zone</div>
			</MemberRootEditor>,
		)

		const hint = screen.getByText("Vote")
		expect(hint.className).toContain(memberRootClasses.editorHint)
		expect(screen.getByTestId("root-zone").className).not.toContain(slideRootClasses.rootZoneContents)
	})
})
