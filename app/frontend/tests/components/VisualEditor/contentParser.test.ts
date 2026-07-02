import { describe, expect, test } from "vitest"

import {
	normalizeTagsFieldValue,
	parseContentToStructured,
	serializedTagsToEditorContent,
	serializeStructuredContent,
} from "@/components/VisualEditor/dynamicData/contentParser"

describe("components/VisualEditor/dynamicData/contentParser", () => {
	test("serializedTagsToEditorContent builds mention nodes from stored hashtag paths", () => {
		const document = serializedTagsToEditorContent("#presentation.org[].name", [
			{ value: "presentation.org[].name", label: "Presentation → Organization - name" },
		])

		expect(document).toEqual({
			type: "doc",
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "mention",
							attrs: {
								id: "presentation.org[].name",
								label: "Presentation → Organization - name",
								mentionSuggestionChar: "#",
							},
						},
					],
				},
			],
		})
	})

	test("serializedTagsToEditorContent preserves plain text between mentions", () => {
		const document = serializedTagsToEditorContent("Hello #circle.name world")

		expect(document.content?.[0]?.content).toEqual([
			{ type: "text", text: "Hello " },
			{
				type: "mention",
				attrs: {
					id: "circle.name",
					label: "circle.name",
					mentionSuggestionChar: "#",
				},
			},
			{ type: "text", text: " world" },
		])
	})

	test("serializeStructuredContent round-trips parsed hashtag paths", () => {
		const structured = parseContentToStructured("#theme.name")
		expect(serializeStructuredContent(structured)).toBe("#theme.name")
	})

	test("normalizeTagsFieldValue strips TipTap wrapper spans from stored HTML", () => {
		const html = "<span><span data-type=\"mention\" class=\"mention\" data-id=\"circle.name\" data-label=\"Circle - name\">#Circle - name</span></span>"

		expect(normalizeTagsFieldValue(html)).toBe("#circle.name")
	})

	test("serializedTagsToEditorContent recovers mention chips from polluted HTML values", () => {
		const html = "<span><span data-type=\"mention\" class=\"mention\" data-id=\"theme.name\" data-label=\"Theme - name\">#Theme - name</span></span>"
		const document = serializedTagsToEditorContent(html, [
			{ value: "theme.name", label: "Theme - name" },
		])

		expect(document.content?.[0]?.content).toEqual([
			{
				type: "mention",
				attrs: {
					id: "theme.name",
					label: "Theme - name",
					mentionSuggestionChar: "#",
				},
			},
		])
	})
})
