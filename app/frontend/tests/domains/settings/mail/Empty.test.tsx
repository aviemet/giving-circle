import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { Empty } from "@/domains/settings/mail/Empty"
import { render } from "@/tests/helpers/utils"

describe("domains/settings/mail/Empty", () => {
	test("renders empty fragment", () => {
		render(
			<div data-testid="host">
				<Empty />
			</div>,
		)
		expect(screen.getByTestId("host")).toBeEmptyDOMElement()
	})
})
