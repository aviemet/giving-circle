import { describe, expect, test } from "vitest"

import { containerClassName } from "@/components/VisualEditor/components/Container"
import * as containerClasses from "@/components/VisualEditor/components/Container/Container.css"
import * as containerEditorClasses from "@/components/VisualEditor/components/Container/Container.editor.css"
import { gridClassName, gridDropZoneClassName } from "@/components/VisualEditor/components/Grid"
import * as gridClasses from "@/components/VisualEditor/components/Grid/Grid.css"
import * as layoutChrome from "@/components/VisualEditor/layoutChrome.editor.css"
import * as puckClasses from "@/components/VisualEditor/Puck.css"

function classTokens(className: string) {
	return new Set(className.split(/\s+/).filter((token) => token.length > 0))
}

describe("components/VisualEditor/editor class composition", () => {
	test("containerClassName includes editor chrome and presentationSlot only when editing", () => {
		const editing = classTokens(containerClassName(true))
		const presenting = classTokens(containerClassName(false))

		expect(editing.has(containerClasses.container)).toBe(true)
		expect(editing.has(containerEditorClasses.container)).toBe(true)
		expect(editing.has(layoutChrome.frame)).toBe(true)
		expect(editing.has(layoutChrome.labelContainer)).toBe(true)
		expect(editing.has(puckClasses.presentationSlot)).toBe(true)

		expect(presenting.has(containerClasses.container)).toBe(true)
		expect(presenting.has(containerEditorClasses.container)).toBe(false)
		expect(presenting.has(layoutChrome.frame)).toBe(false)
		expect(presenting.has(layoutChrome.labelContainer)).toBe(false)
		expect(presenting.has(puckClasses.presentationSlot)).toBe(false)
	})

	test("gridDropZoneClassName includes layout chrome only when editing", () => {
		const editingHost = classTokens(gridClassName(true))
		const editingZone = classTokens(gridDropZoneClassName(true))
		const presentingZone = classTokens(gridDropZoneClassName(false))

		expect(editingHost.has(gridClasses.grid)).toBe(true)
		expect(editingHost.has(puckClasses.presentationSlot)).toBe(true)
		expect(editingHost.has(layoutChrome.frame)).toBe(false)

		expect(editingZone.has(layoutChrome.frame)).toBe(true)
		expect(editingZone.has(layoutChrome.labelGrid)).toBe(true)
		expect(editingZone.has(puckClasses.presentationSlot)).toBe(true)

		expect(presentingZone.has(gridClasses.grid)).toBe(true)
		expect(presentingZone.has(layoutChrome.frame)).toBe(false)
		expect(presentingZone.has(layoutChrome.labelGrid)).toBe(false)
		expect(presentingZone.has(puckClasses.presentationSlot)).toBe(false)
	})
})
