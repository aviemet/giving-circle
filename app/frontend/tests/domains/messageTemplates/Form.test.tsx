import { screen, waitFor } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { MessageTemplateForm } from "@/domains/messageTemplates/Form"
import { createMessageTemplatesFormData } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/messageTemplates/Form", () => {
	test("loads craft form for create", () => {
		render(
			<MessageTemplateForm
				to="/settings/circle/message_templates"
				message_template={ createMessageTemplatesFormData() }
			/>,
		)

		expect(screen.getByText("Create Template")).toBeTruthy()
	})

	test("loads craft form for update", () => {
		render(
			<MessageTemplateForm
				to="/settings/circle/message_templates/welcome"
				method="put"
				message_template={ createMessageTemplatesFormData({
					id: "template-1",
					slug: "welcome",
				}) }
			/>,
		)

		expect(screen.getByText("Update Template")).toBeTruthy()
	})

	test("previews email subject and body with mock circle tags", async () => {
		render(
			<MessageTemplateForm
				to="/settings/circle/message_templates"
				message_template={ createMessageTemplatesFormData({
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
			<MessageTemplateForm
				to="/settings/circle/message_templates"
				message_template={ createMessageTemplatesFormData({
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
