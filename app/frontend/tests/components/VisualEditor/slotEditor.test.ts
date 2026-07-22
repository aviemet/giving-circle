import { describe, expect, test } from "vitest"

import { defaultBackgroundImageValue } from "@/components/VisualEditor/fields/backgroundImage"
import {
	createStarterSlideData,
	slotDropZoneProps,
	withStarterSlideContent,
	DRAG_HITBOX_HEIGHT_PX,
	DRAG_SLOT_GAP_PX,
	DRAG_SLOT_GUTTER_PX,
	SLOT_MIN_EMPTY_HEIGHT,
} from "@/components/VisualEditor/slotEditor"

describe("components/VisualEditor/slotEditor", () => {
	test("slotDropZoneProps sets minEmptyHeight for Puck slots", () => {
		expect(slotDropZoneProps()).toEqual({ minEmptyHeight: SLOT_MIN_EMPTY_HEIGHT })
	})

	test("drag drop gutters are large enough for nested container targeting", () => {
		expect(DRAG_SLOT_GUTTER_PX).toBeGreaterThanOrEqual(32)
		expect(DRAG_SLOT_GAP_PX).toBeGreaterThanOrEqual(24)
		expect(DRAG_HITBOX_HEIGHT_PX).toBeGreaterThanOrEqual(32)
	})

	test("createStarterSlideData includes a container with a heading", () => {
		const data = createStarterSlideData()
		const container = data.content?.[0]

		expect(data.content).toHaveLength(1)
		expect(container?.type).toBe("Container")
		if(container?.type !== "Container") return

		expect(container.props.content).toHaveLength(1)
		expect(container.props.content[0]?.type).toBe("Heading")
	})

	test("withStarterSlideContent leaves non-empty slides unchanged", () => {
		const existing = {
			content: [{
				type: "Heading" as const,
				props: {
					id: "existing-heading",
					title: "Keep me",
					padding: 16,
					order: 1 as const,
					color: "#FFFFFF",
				},
			}],
			root: {
				props: {
					title: "Custom",
					backgroundColor: "#000000",
					backgroundImage: defaultBackgroundImageValue(),
				},
			},
		}

		expect(withStarterSlideContent(existing)).toBe(existing)
	})

	test("withStarterSlideContent seeds empty slides", () => {
		const seeded = withStarterSlideContent({
			content: [],
			root: {
				props: {
					title: "My deck slide",
					backgroundColor: "#000000",
					backgroundImage: defaultBackgroundImageValue(),
				},
			},
		})

		expect(seeded.content).toHaveLength(1)
		expect(seeded.root?.props?.title).toBe("My deck slide")
	})
})
