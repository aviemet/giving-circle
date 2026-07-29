import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { AppShell } from "@/components"
import { AppFooter } from "@/layouts/AppLayout/AppFooter"
import { render } from "@/tests/helpers/utils"

describe("layouts/AppLayout/AppFooter", () => {
	test("renders footer portal and copyright year", () => {
		render(
			<AppShell footer={ { height: 40 } }>
				<AppFooter />
			</AppShell>,
		)
		expect(document.getElementById("footer-portal")).toBeTruthy()
		screen.getByRole("contentinfo")
		expect(screen.getByRole("contentinfo").textContent).toContain(String(new Date().getFullYear()))
	})
})
