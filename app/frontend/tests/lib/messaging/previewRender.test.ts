import { describe, expect, test } from "vitest"

import { Routes } from "@/lib"
import { messagingPreviewValues, renderMessagingPreview } from "@/lib/messaging/previewRender"
import {
	createCircleMock,
	createMembershipPersisted,
	createThemePersisted,
} from "@/tests/helpers/fixtures"

describe("lib/messaging/previewRender", () => {
	test("builds preview values from mock circle data with absolute interact url", () => {
		const mockCircle = createCircleMock({
			name: "Battery Powered",
			slug: "battery-powered",
			themes: [createThemePersisted({ name: "Allocation Night", slug: "allocation-night" })],
			memberships: [createMembershipPersisted({ name: "Ada Lovelace", slug: "ada" })],
		})

		expect(messagingPreviewValues(mockCircle, "http://localhost:3000")).toEqual({
			"circle.name": "Battery Powered",
			"presentation.name": "Allocation Night",
			"membership.name": "Ada Lovelace",
			interact_url: `http://localhost:3000${Routes.circlePresentationInteract("battery-powered", "preview")}`,
		})
	})

	test("replaces messaging tags with mock values", () => {
		const values = messagingPreviewValues(createCircleMock(), "https://www.example.com")

		expect(renderMessagingPreview(
			"Hi #membership.name from #circle.name for #presentation.name: #interact_url",
			values,
		)).toBe(`Hi Member 1 from Circle 1 for Theme 1: ${values.interact_url}`)
		expect(values.interact_url).toMatch(/^https:\/\/www\.example\.com\//)
	})
})
