import { MantineProvider } from "@mantine/core"
import { render, screen, waitFor } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { Form } from "@/components/Form"
import { TextInput } from "@/components/Inputs"

describe("components/Form/Form", () => {
	test("applies initialData to uncontrolled inputs", async() => {
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
})

