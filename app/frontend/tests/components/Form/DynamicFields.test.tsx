import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test } from "vitest"

import { Form } from "@/components/Form"
import { DynamicFields } from "@/components/Form/DynamicFields"
import { ResetButton } from "@/components/Form/ResetButton"
import { TextInput } from "@/components/Inputs"
import { render } from "@/tests/helpers/utils"

describe("components/Form/DynamicFields", () => {
	test("adds and removes field rows", async () => {
		const user = userEvent.setup()

		render(
			<Form action="/test" method="post" initialData={ { items: [] } }>
				<DynamicFields basePath="items" initialCount={ 1 } label="Items">
					{ (index, namePrefix) => (
						<TextInput name={ `${namePrefix}.name` } label={ `Item ${index}` } />
					) }
				</DynamicFields>
			</Form>,
		)

		screen.getByLabelText("Item 0")
		await user.click(screen.getByLabelText("Add item"))
		screen.getByLabelText("Item 1")
		await user.click(screen.getByLabelText("Remove item 1"))
		expect(screen.queryByLabelText("Item 1")).toBeNull()
	})
})

describe("components/Form/ResetButton", () => {
	test("renders reset button inside form", () => {
		render(
			<Form action="/test" method="post" initialData={ { name: "x" } }>
				<TextInput name="name" label="Name" />
				<ResetButton />
			</Form>,
		)

		screen.getByRole("button", { name: "Reset" })
	})
})
