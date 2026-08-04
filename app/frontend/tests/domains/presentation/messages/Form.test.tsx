import { screen, waitFor } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { PresentationMessageForm } from "@/domains/presentation/messages/Form"
import { createPresentationMessagesFormData } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/presentation/messages/Form", () => {
	test("loads craft form for create", () => {
		render(
			<PresentationMessageForm
				to="/messaging/messages"
				presentation_message={ createPresentationMessagesFormData() }
			/>,
		)

		expect(screen.getByText("Create Message")).toBeTruthy()
	})

	test("loads craft form for update", () => {
		render(
			<PresentationMessageForm
				to="/messaging/messages/welcome"
				method="put"
				presentation_message={ createPresentationMessagesFormData({
					id: "message-1",
					slug: "welcome",
				}) }
			/>,
		)

		expect(screen.getByText("Update Message")).toBeTruthy()
	})

	test("previews email subject and body with mock circle tags", async () => {
		render(
			<PresentationMessageForm
				to="/messaging/messages"
				presentation_message={ createPresentationMessagesFormData({
					subject: "Hello #membership.name",
					body: "<p>Welcome to #circle.name</p>",
				}) }
			/>,
		)

		await waitFor(() => {
			expect(screen.getByText("Preview")).toBeTruthy()
			expect(screen.getByText("Hello Member 1")).toBeTruthy()
			expect(screen.getByText("Welcome to Circle 1")).toBeTruthy()
		})
	})

	test("previews sms body with mock circle tags", async () => {
		render(
			<PresentationMessageForm
				to="/messaging/messages"
				presentation_message={ createPresentationMessagesFormData({
					medium: "sms",
					body: "Hi #membership.name from #circle.name",
				}) }
			/>,
		)

		await waitFor(() => {
			expect(screen.getByText("Preview")).toBeTruthy()
			expect(screen.getByText("Hi Member 1 from Circle 1")).toBeTruthy()
		})
	})
})
