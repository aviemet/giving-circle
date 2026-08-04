import { router } from "@inertiajs/react"
import { modals } from "@mantine/modals"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { afterEach, describe, expect, test, vi } from "vitest"

import { ChooseMessageTemplateModalContent } from "@/domains/presentation/messages/ChooseMessageTemplateModalContent"
import { createMessageTemplatesPersisted } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

vi.mock("@mantine/modals", async () => {
	const actual = await vi.importActual<typeof import("@mantine/modals")>("@mantine/modals")

	return {
		...actual,
		modals: {
			...actual.modals,
			closeAll: vi.fn(),
		},
	}
})

describe("domains/presentation/messages/ChooseMessageTemplateModalContent", () => {
	afterEach(() => {
		vi.clearAllMocks()
	})

	test("shows empty state when no templates exist", () => {
		render(
			<ChooseMessageTemplateModalContent
				messageTemplates={ [] }
				circleSlug="circle"
				themeSlug="theme"
				presentationSlug="presentation"
			/>,
		)

		expect(screen.getByText("No message templates are available yet. Create one in Settings.")).toBeTruthy()
	})

	test("navigates to new message with selected template", async () => {
		const user = userEvent.setup()
		const template = createMessageTemplatesPersisted()

		render(
			<ChooseMessageTemplateModalContent
				messageTemplates={ [template] }
				circleSlug="circle"
				themeSlug="theme"
				presentationSlug="presentation"
			/>,
		)

		expect(screen.getByText("Email")).toBeTruthy()
		expect(screen.queryByText("SMS")).toBeNull()

		await user.click(screen.getByRole("button", { name: "Welcome template" }))

		expect(router.visit).toHaveBeenCalledWith(
			expect.stringContaining("message_template_id=message-template-1"),
		)
		expect(modals.closeAll).toHaveBeenCalled()
	})

	test("groups templates by medium", () => {
		render(
			<ChooseMessageTemplateModalContent
				messageTemplates={ [
					createMessageTemplatesPersisted({ id: "email-1", name: "Invite email", medium: "email" }),
					createMessageTemplatesPersisted({ id: "sms-1", name: "Invite sms", medium: "sms", slug: "invite-sms" }),
				] }
				circleSlug="circle"
				themeSlug="theme"
				presentationSlug="presentation"
			/>,
		)

		expect(screen.getByText("Email")).toBeTruthy()
		expect(screen.getByText("SMS")).toBeTruthy()
		expect(screen.getByRole("button", { name: "Invite email" })).toBeTruthy()
		expect(screen.getByRole("button", { name: "Invite sms" })).toBeTruthy()
	})
})
