import { screen } from "@testing-library/react"
import React from "react"
import { describe, test, vi } from "vitest"

import { AppearanceSettingsPage } from "@/pages/Settings/Appearance/Index"
import { render } from "@/tests/helpers/utils"

vi.mock("@/layouts/AppLayout/SettingsLayout", () => ({
	SettingsLayout: ({ children }: { children: React.ReactNode }) => <div>{ children }</div>,
}))

describe("pages/Settings/Appearance/Index", () => {
	test("renders primary color form", () => {
		render(<AppearanceSettingsPage settings={ { primary_color: "grape" } } />)

		screen.getByText("Site Color")
		screen.getByRole("button", { name: "Save Appearance Settings" })
	})
})
