import { describe, test } from "vitest"

import IntegrationsSettings from "@/pages/Settings/Integrations/Index"
import { render } from "@/tests/helpers/utils"

describe("pages/Settings/Integrations/Index", () => {
	test("renders integrations settings page", () => {
		render(<IntegrationsSettings />)
	})
})
