import { describe, test } from "vitest"

import NotificationsSettings from "@/pages/Settings/Notifications/Index"
import { render } from "@/tests/helpers/utils"

describe("pages/Settings/Notifications/Index", () => {
	test("renders notifications settings page", () => {
		render(<NotificationsSettings />)
	})
})
