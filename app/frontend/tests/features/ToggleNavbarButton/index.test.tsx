import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { beforeEach, describe, expect, test } from "vitest"

import { ToggleNavbarButton } from "@/features/ToggleNavbarButton"
import { useLayoutStore } from "@/store"
import { render } from "@/tests/helpers/utils"

describe("features/ToggleNavbarButton", () => {
	beforeEach(() => {
		useLayoutStore.setState({ sidebarVisible: true, sidebarOpen: true })
	})

	test("toggles sidebar when clicked", async () => {
		const user = userEvent.setup()
		render(<ToggleNavbarButton />)
		const buttons = screen.getAllByRole("button")
		expect(buttons.length).toBeGreaterThan(0)
		await user.click(buttons[0])
		expect(useLayoutStore.getState().sidebarOpen).toBe(false)
	})
})
