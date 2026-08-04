import { screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import ActivePresentationMessaging from "@/pages/Presentations/Active/Messaging"
import {
	createCirclePersisted,
	createPresentationMessagesIndex,
	createPresentationsShow,
	createThemePersisted,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Active/Messaging/index", () => {
	test("loads active messaging", () => {
		render(
			<ActivePresentationMessaging
				circle={ createCirclePersisted() }
				theme={ createThemePersisted() }
				presentation={ createPresentationsShow() }
				presentation_messages={ [
					createPresentationMessagesIndex({ name: "Welcome email" }),
				] }
			/>,
		)

		expect(screen.getByTestId("inertia-head")).toHaveAttribute("data-title", "Messaging")
		expect(screen.getByText("Welcome email")).toBeTruthy()
	})
})
