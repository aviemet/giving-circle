import { MantineProvider } from "@mantine/core"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React, { useState } from "react"
import { describe, expect, test } from "vitest"

import { Form } from "@/components/Form"
import { TextInput } from "@/components/Inputs"

describe("components/Form/Form", () => {
	test("applies initialData to uncontrolled inputs", async () => {
		render(
			<MantineProvider>
				<Form
					action="/test"
					method="post"
					initialData={ { user: { email: "test@example.com" } } }
				>
					<TextInput name="user.email" label="Email" />
				</Form>
			</MantineProvider>
		)

		await waitFor(() => {
			const el = screen.getByLabelText("Email")
			if(!(el instanceof HTMLInputElement)) throw new Error("Expected input element")
			expect(el.value).toBe("test@example.com")
		})
	})

	test("does not reset inputs when parent state changes initialData reference", async () => {
		const user = userEvent.setup()

		function TestForm() {
			const [externalVersion, setExternalVersion] = useState(0)

			return (
				<>
					<button type="button" onClick={ () => setExternalVersion((current) => current + 1) }>
						Bump external state
					</button>
					<Form
						action="/test"
						method="post"
						initialData={ {
							user: {
								email: "test@example.com",
								version: externalVersion,
							},
						} }
					>
						<TextInput name="user.email" label="Email" />
					</Form>
				</>
			)
		}

		render(
			<MantineProvider>
				<TestForm />
			</MantineProvider>
		)

		const emailInput = await screen.findByLabelText("Email")
		if(!(emailInput instanceof HTMLInputElement)) throw new Error("Expected input element")

		await waitFor(() => {
			expect(emailInput.value).toBe("test@example.com")
		})

		await user.tripleClick(emailInput)
		await user.keyboard("edited@example.com")
		expect(emailInput.value).toBe("edited@example.com")

		await user.click(screen.getByRole("button", { name: "Bump external state" }))

		await waitFor(() => {
			expect(emailInput.value).toBe("edited@example.com")
		})
	})
})

