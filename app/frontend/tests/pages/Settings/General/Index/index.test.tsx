import { describe, test } from "vitest"

import GeneralSettings from "@/pages/Settings/General/Index"
import { render } from "@/tests/helpers/utils"

describe("pages/Settings/General/Index", () => {
	test("renders general settings page", () => {
		render(<GeneralSettings />)
	})
})
