import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { SmtpList } from "@/domains/settings/mail/SmtpList"
import { createSmtpsIndex } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/settings/mail/SmtpList", () => {
	test("returns null without circleSlug", () => {
		render(
			<div data-testid="host">
				<SmtpList smtps={ [createSmtpsIndex()] } circleSlug={ undefined } />
			</div>,
		)
		expect(screen.getByTestId("host")).toBeEmptyDOMElement()
	})

	test("mounts with smtp records", () => {
		render(
			<SmtpList
				smtps={ [createSmtpsIndex({ domain: "example.com", username: "mailer" })] }
				circleSlug="circle-1"
			/>,
		)
		expect(document.body).toBeTruthy()
	})
})
