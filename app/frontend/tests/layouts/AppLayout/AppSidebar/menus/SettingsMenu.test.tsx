import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test } from "vitest"

import { Accordion } from "@/components"
import { SettingsMenu } from "@/layouts/AppLayout/AppSidebar/menus/SettingsMenu"
import { Routes } from "@/lib"
import { render } from "@/tests/helpers/utils"

describe("layouts/AppLayout/AppSidebar/menus/SettingsMenu", () => {
	test("renders general settings link", async () => {
		const user = userEvent.setup()

		render(
			<Accordion multiple>
				<SettingsMenu />
			</Accordion>,
		)

		await user.click(screen.getByRole("button", { name: "Settings" }))

		await waitFor(() => {
			expect(screen.getByRole("link", { name: "General" })).toHaveAttribute(
				"href",
				Routes.settingsGeneral(),
			)
		})
	})
})
