import { describe, expect, test } from "vitest"

import {
	createStarterSlideData,
	slotDropZoneProps,
	withStarterSlideContent,
	SLOT_MIN_EMPTY_HEIGHT,
} from "@/components/VisualEditor/slotEditor"

describe("components/VisualEditor/slotEditor", () => {
	test("slotDropZoneProps sets minEmptyHeight for Puck slots", () => {
		expect(slotDropZoneProps()).toEqual({ minEmptyHeight: SLOT_MIN_EMPTY_HEIGHT })
	})

	test("createStarterSlideData includes a container with a heading", () => {
		const data = createStarterSlideData()

		expect(data.content).toHaveLength(1)
		expect(data.content?.[0]?.type).toBe("Container")
		expect(data.content?.[0]?.props.content).toHaveLength(1)
		expect(data.content?.[0]?.props.content[0]?.type).toBe("Heading")
	})

	test("withStarterSlideContent leaves non-empty slides unchanged", () => {
		const existing = {
			content: [{ type: "Heading", props: { title: "Keep me" } }],
			root: { props: { title: "Custom" } },
		}

		expect(withStarterSlideContent(existing)).toBe(existing)
	})

	test("withStarterSlideContent seeds empty slides", () => {
		const seeded = withStarterSlideContent({
			content: [],
			root: { props: { title: "My deck slide" } },
		})

		expect(seeded.content).toHaveLength(1)
		expect(seeded.root?.props?.title).toBe("My deck slide")
	})
})
