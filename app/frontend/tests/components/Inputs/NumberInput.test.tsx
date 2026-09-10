import { MantineProvider } from "@mantine/core"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React, { useState } from "react"
import { describe, expect, test } from "vitest"

import { Form } from "@/components/Form"
import { NumberInput } from "@/components/Inputs/NumberInput"

describe("components/Inputs/NumberInput", () => {
	test("renders a controlled value outside Form", () => {
		render(
			<MantineProvider>
				<NumberInput
					label="Votes"
					value={ 3 }
					onChange={ () => {} }
				/>
			</MantineProvider>,
		)

		expect(screen.getByDisplayValue("3")).toBeTruthy()
	})

	test("shows initialData value inside a Form", async () => {
		render(
			<MantineProvider>
				<Form
					action="/test"
					method="post"
					initialData={ { presentation: { settings: { finalist_count: 4 } } } }
				>
					<NumberInput
						name="presentation.settings.finalist_count"
						label="Number of finalists"
						min={ 1 }
					/>
				</Form>
			</MantineProvider>,
		)

		await waitFor(() => {
			expect(screen.getByLabelText("Number of finalists")).toHaveValue("4")
		})
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
						initialData={ { presentation: { settings: { finalist_count: 4 } } } }
					>
						<NumberInput
							name="presentation.settings.finalist_count"
							label="Number of finalists"
							min={ 1 }
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
			expect(screen.getByLabelText("Number of finalists")).toHaveValue("4")
		})

		await user.click(screen.getByRole("button", { name: "Bump sibling state" }))

		await waitFor(() => {
			expect(screen.getByLabelText("Number of finalists")).toHaveValue("4")
		})
	})
})
