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

	test("collapses the sidebar when the open-state control is clicked", async () => {
		const user = userEvent.setup()
		render(<ToggleNavbarButton />)
		const buttons = screen.getAllByRole("button", { name: "Collapse sidebar" })
		await user.click(buttons[0])
		expect(useLayoutStore.getState().sidebarOpen).toBe(false)
	})

	test("expands the sidebar when the closed-state control is clicked", async () => {
		useLayoutStore.setState({ sidebarVisible: true, sidebarOpen: false })
		const user = userEvent.setup()
		render(<ToggleNavbarButton />)
		const buttons = screen.getAllByRole("button", { name: "Expand sidebar" })
		await user.click(buttons[0])
		expect(useLayoutStore.getState().sidebarOpen).toBe(true)
	})

	test("renders nothing in the header when hidden", () => {
		render(<ToggleNavbarButton hidden />)
		expect(screen.queryByRole("button", { name: "Collapse sidebar" })).toBeNull()
		expect(screen.queryByRole("button", { name: "Expand sidebar" })).toBeNull()
	})
})
