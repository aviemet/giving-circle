import { describe, expect, test } from "vitest"

import {
	isSlideRootClickTarget,
	PUCK_ROOT_DROPZONE_ID,
} from "@/components/VisualEditor/components/SlideRoot"

describe("components/VisualEditor/components/SlideRoot/slideRootSelection", () => {
	test("isSlideRootClickTarget returns true for the root dropzone background", () => {
		const dropzone = document.createElement("div")
		dropzone.setAttribute("data-puck-dropzone", PUCK_ROOT_DROPZONE_ID)

		expect(isSlideRootClickTarget(dropzone)).toBe(true)
	})

	test("isSlideRootClickTarget returns true for clicks outside any dropzone", () => {
		const slideRoot = document.createElement("div")

		expect(isSlideRootClickTarget(slideRoot)).toBe(true)
	})

	test("isSlideRootClickTarget returns false for nested dropzones", () => {
		const dropzone = document.createElement("div")
		dropzone.setAttribute("data-puck-dropzone", "starter-container:content")

		expect(isSlideRootClickTarget(dropzone)).toBe(false)
	})

	test("isSlideRootClickTarget returns false for puck components", () => {
		const component = document.createElement("div")
		component.setAttribute("data-puck-component", "starter-heading")

		expect(isSlideRootClickTarget(component)).toBe(false)
	})

	test("isSlideRootClickTarget returns false for descendants of puck components", () => {
		const component = document.createElement("div")
		component.setAttribute("data-puck-component", "starter-heading")
		const headingText = document.createElement("span")
		component.appendChild(headingText)

		expect(isSlideRootClickTarget(headingText)).toBe(false)
	})
})
