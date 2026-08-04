import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { CircleSettingsMenu } from "@/layouts/AppLayout/AppSidebar/menus/CircleSettingsMenu"
import { Routes } from "@/lib"
import { createCircleInertiaShare } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("layouts/AppLayout/AppSidebar/menus/CircleSettingsMenu", () => {
	test("renders circle settings links", () => {
		const circle = createCircleInertiaShare()

		render(<CircleSettingsMenu circle={ circle } />)

		expect(screen.getByRole("link", { name: "Branding" })).toHaveAttribute(
			"href",
			Routes.settingsBranding(circle.slug),
		)
		expect(screen.getByRole("link", { name: "Integrations" })).toHaveAttribute(
			"href",
			Routes.settingsIntegrations(circle.slug),
		)
		expect(screen.getByRole("link", { name: "Notifications" })).toHaveAttribute(
			"href",
			Routes.settingsNotifications(circle.slug),
		)
	})
})
