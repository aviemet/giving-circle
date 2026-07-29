import { MantineProvider } from "@mantine/core"
import { screen, waitFor, render } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { Form } from "@/components/Form"
import { SplitDateTimeInput } from "@/components/Inputs/SplitDateTimeInput"

describe("components/Inputs/SplitDateTimeInput", () => {
	test("renders date and time parts with initial value", async () => {
		render(
			<MantineProvider>
				<Form action="/test" method="post" initialData={ { starts_at: "2024-01-15T14:30:00.000Z" } }>
					<SplitDateTimeInput name="starts_at">
						<SplitDateTimeInput.Date label="Date" />
						<SplitDateTimeInput.Time label="Time" />
					</SplitDateTimeInput>
				</Form>
			</MantineProvider>,
		)

		screen.getByText("Date")
		screen.getByText("Time")
		const hidden = document.querySelector("input[type=\"hidden\"][name=\"starts_at\"]")
		expect(hidden).toBeTruthy()
		if(!(hidden instanceof HTMLInputElement)) {
			expect.unreachable()
			return
		}

		await waitFor(() => {
			expect(hidden.value.length).toBeGreaterThan(0)
		})
	})

	test("renders empty when no initial value", () => {
		render(
			<MantineProvider>
				<Form action="/test" method="post" initialData={ { starts_at: "" } }>
					<SplitDateTimeInput name="starts_at">
						<SplitDateTimeInput.Date label="Date" />
						<SplitDateTimeInput.Time label="Time" />
					</SplitDateTimeInput>
				</Form>
			</MantineProvider>,
		)
		screen.getByText("Date")
		screen.getByText("Time")
	})
})
