import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import { Burger } from "@/components/Burger"
import { render } from "@/tests/helpers/utils"

describe("components/Burger", () => {
	test("calls onClick when the closed control is clicked", async () => {
		const user = userEvent.setup()
		const handleClick = vi.fn()
		render(<Burger aria-label="Toggle navigation" onClick={ handleClick } />)
		await user.click(screen.getByRole("button", { name: "Toggle navigation" }))
		expect(handleClick).toHaveBeenCalledOnce()
	})

	test("calls onClick when the opened control is clicked", async () => {
		const user = userEvent.setup()
		const handleClick = vi.fn()
		render(<Burger opened aria-label="Toggle navigation" onClick={ handleClick } />)
		await user.click(screen.getByRole("button", { name: "Toggle navigation" }))
		expect(handleClick).toHaveBeenCalledOnce()
	})
})
