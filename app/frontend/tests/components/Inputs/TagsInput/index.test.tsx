import { MantineProvider } from "@mantine/core"
import { render, waitFor } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { Form } from "@/components/Form"
import { TagsInput } from "@/components/Inputs/TagsInput"

describe("components/Inputs/TagsInput", () => {
	test("shows initialData value inside a Form", async () => {
		render(
			<MantineProvider>
				<Form
					action="/test"
					method="post"
					initialData={ { message_template: { subject: "Hello #name" } } }
				>
					<TagsInput
						name="message_template.subject"
						label="Subject"
					/>
				</Form>
			</MantineProvider>,
		)

		const hidden = document.querySelector("input[type=\"hidden\"][name=\"message_template.subject\"]")
		expect(hidden).toBeTruthy()
		if(!(hidden instanceof HTMLInputElement)) {
			expect.unreachable()
			return
		}

		await waitFor(() => {
			expect(hidden.value).toBe("Hello #name")
		})
	})
})
