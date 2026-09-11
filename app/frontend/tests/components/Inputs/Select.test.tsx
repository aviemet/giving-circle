import { MantineProvider } from "@mantine/core"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React, { useState } from "react"
import { describe, expect, test } from "vitest"

import { Form } from "@/components/Form"
import { Select } from "@/components/Inputs/Select"

describe("components/Inputs/Select", () => {
	test("shows initialData value inside a Form", async () => {
		render(
			<MantineProvider>
				<Form
					action="/test"
					method="post"
					initialData={ { interaction: { trigger_type: "manual" } } }
				>
					<Select
						name="interaction.trigger_type"
						label="Trigger type"
						options={ [
							{ label: "Manual", value: "manual" },
							{ label: "Slide", value: "slide" },
						] }
					/>
				</Form>
			</MantineProvider>,
		)

		await waitFor(() => {
			expect(screen.getByRole("combobox")).toHaveValue("Manual")
		})

		const hidden = document.querySelector("input[type=\"hidden\"][name=\"interaction.trigger_type\"]")
		expect(hidden).toBeTruthy()
		if(!(hidden instanceof HTMLInputElement)) {
			expect.unreachable()
			return
		}
		expect(hidden.value).toBe("manual")
	})

	test("keeps form field value when an unrelated sibling state update re-renders", async () => {
		const user = userEvent.setup()

		function TestForm() {
			const [counter, setCounter] = useState(0)

			return (
				<>
					<button type="button" onClick={ () => setCounter((current) => current + 1) }>
						Bump sibling state
					</button>
					<span>{ counter }</span>
					<Form
						action="/test"
						method="post"
						initialData={ { interaction: { trigger_type: "manual" } } }
					>
						<Select
							name="interaction.trigger_type"
							label="Trigger type"
							options={ [
								{ label: "Manual", value: "manual" },
								{ label: "Slide", value: "slide" },
							] }
						/>
					</Form>
				</>
			)
		}

		render(
			<MantineProvider>
				<TestForm />
			</MantineProvider>,
		)

		await waitFor(() => {
			expect(screen.getByRole("combobox")).toHaveValue("Manual")
		})

		await user.click(screen.getByRole("button", { name: "Bump sibling state" }))

		await waitFor(() => {
			expect(screen.getByRole("combobox")).toHaveValue("Manual")
		})
	})
})
