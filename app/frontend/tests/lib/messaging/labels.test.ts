import { describe, expect, test } from "vitest"

import {
	presentationMessageMediumLabel,
	presentationMessageStatusLabel,
} from "@/lib/messaging/labels"

describe("lib/messaging/labels", () => {
	test("labels message mediums for display", () => {
		expect(presentationMessageMediumLabel("email")).toBe("Email")
		expect(presentationMessageMediumLabel("sms")).toBe("SMS")
	})

	test("labels message statuses for display", () => {
		expect(presentationMessageStatusLabel("ready")).toBe("Ready")
		expect(presentationMessageStatusLabel("sending")).toBe("Sending")
		expect(presentationMessageStatusLabel("finished")).toBe("Finished")
	})
})
