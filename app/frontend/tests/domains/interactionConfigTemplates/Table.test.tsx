import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { InteractionConfigTemplatesTable } from "@/domains/interactionConfigTemplates/Table"
import {
	createInteractionConfigTemplatesIndex,
	createPagination,
} from "@/tests/helpers/fixtures"
import { registerActiveCircleLifecycle } from "@/tests/helpers/pageTestLifecycle"
import { render } from "@/tests/helpers/utils"

describe("domains/interactionConfigTemplates/Table", () => {
	registerActiveCircleLifecycle()

	test("mounts data table for interaction templates", () => {
		render(
			<InteractionConfigTemplatesTable
				records={ [createInteractionConfigTemplatesIndex()] }
				pagination={ createPagination({ count: 1 }) }
				model="interaction_config_templates"
			/>,
		)

		expect(document.body).toBeTruthy()
	})
})
