import { modals } from "@mantine/modals"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, test, vi } from "vitest"

import PresentationMessagesIndex from "@/pages/Presentations/Messages/Index"
import {
	createCirclePersisted,
	createMessageTemplatesPersisted,
	createPresentationMessagesIndex,
	createPresentationsShow,
	createThemePersisted,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

vi.mock("@mantine/modals", async () => {
	const actual = await vi.importActual<typeof import("@mantine/modals")>("@mantine/modals")

	return {
		...actual,
		modals: {
			...actual.modals,
			open: vi.fn(),
		},
	}
})

describe("pages/Presentations/Messages/Index", () => {
	afterEach(() => {
		vi.clearAllMocks()
	})

	test("loads messaging setup", () => {
		render(
			<PresentationMessagesIndex
				circle={ createCirclePersisted() }
				theme={ createThemePersisted() }
				presentation={ createPresentationsShow() }
				presentation_messages={ [
					createPresentationMessagesIndex({ name: "Invite email" }),
					createPresentationMessagesIndex({
						id: "sms-1",
						medium: "sms",
						name: "Invite SMS",
						slug: "invite-sms",
					}),
				] }
				message_templates={ [] }
			/>,
		)

		expect(screen.getByTestId("inertia-head")).toHaveAttribute("data-title", "Messaging")
		expect(screen.getByText("Invite email")).toBeTruthy()
		expect(screen.getByText("Invite SMS")).toBeTruthy()
	})

	test("opens template chooser", async () => {
		const user = userEvent.setup()

		render(
			<PresentationMessagesIndex
				circle={ createCirclePersisted() }
				theme={ createThemePersisted() }
				presentation={ createPresentationsShow() }
				presentation_messages={ [] }
				message_templates={ [createMessageTemplatesPersisted()] }
			/>,
		)

		await user.click(screen.getByLabelText("More new message options"))
		await user.click(await screen.findByText("New Message from Template"))

		await waitFor(() => {
			expect(modals.open).toHaveBeenCalledWith(
				expect.objectContaining({
					title: "Choose a message template",
				}),
			)
		})
	})
})
