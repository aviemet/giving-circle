import { router } from "@inertiajs/react"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import { DateInput } from "@/components/Inputs/DateInput"
import { MultiSelect } from "@/components/Inputs/MultiSelect"
import { render } from "@/tests/helpers/utils"

describe("components/Inputs/DateInput", () => {
	test("renders with date value and label", () => {
		render(
			<DateInput
				name="starts_on"
				label="Starts on"
				value={ new Date(2024, 0, 15) }
			/>,
		)
		screen.getByText("Starts on")
	})

	test("renders range type", () => {
		render(
			<DateInput
				name="range"
				label="Range"
				type="range"
				value={ ["01/15/2024", "01/20/2024"] }
			/>,
		)
		screen.getByText("Range")
	})
})

describe("components/Inputs/MultiSelect", () => {
	test("reloads when dropdown opens with fetchOnOpen", async () => {
		const user = userEvent.setup()
		const reload = vi.mocked(router.reload)
		reload.mockClear()

		const { container } = render(
			<MultiSelect
				name="tags"
				label="Tags"
				options={ [{ value: "a", label: "A" }] }
				fetchOnOpen="tags"
			/>,
		)

		screen.getByText("Tags")
		const input = container.querySelector("#tags-search")
		expect(input).toBeTruthy()
		if(input === null) {
			expect.unreachable()
			return
		}
		await user.click(input)
		expect(reload).toHaveBeenCalledWith({ only: ["tags"] })
	})
})
