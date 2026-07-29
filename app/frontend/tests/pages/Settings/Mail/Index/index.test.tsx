import { describe, test } from "vitest"

import MailSettings from "@/pages/Settings/Mail/Index"
import { createSmtpsIndex } from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("pages/Settings/Mail/Index", () => {
	registerActiveCircleLifecycle()

	test("renders empty mail settings", () => {
		render(<MailSettings smtps={ [] } />)
	})

	test("renders smtp list", () => {
		render(<MailSettings smtps={ [createSmtpsIndex()] } />)
	})
})
