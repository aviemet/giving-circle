import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import ActivePresentationMessaging from "@/pages/Presentations/Active/Messaging"
import { render } from "@/tests/helpers/utils"

describe("pages/Presentations/Active/Messaging/index", () => {
	test("renders messaging", () => {
		render(<ActivePresentationMessaging />)

		screen.getByText("Messaging")
	})
})
