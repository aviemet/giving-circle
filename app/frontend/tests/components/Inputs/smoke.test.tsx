import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import {
	AutocompleteInput,
	ColorPickerInput,
	DateInput,
	DateTimeInput,
	MultiSelect,
	Textarea,
	TimeInput,
} from "@/components/Inputs"
import { render } from "@/tests/helpers/utils"

describe("components/Inputs smoke", () => {
	test("renders DateInput", () => {
		render(<DateInput name="date" label="Date" value={ undefined } />)
		screen.getByText("Date")
	})

	test("renders TimeInput", () => {
		render(<TimeInput name="time" label="Time" value="14:30" />)
		screen.getByText("Time")
	})

	test("renders DateTimeInput", () => {
		render(<DateTimeInput name="datetime" label="DateTime" value={ new Date(2024, 0, 15) } />)
		screen.getByText("DateTime")
	})

	test("renders MultiSelect", () => {
		render(
			<MultiSelect
				name="tags"
				label="Tags"
				options={ [{ value: "a", label: "A" }] }
			/>,
		)
		screen.getByText("Tags")
	})

	test("renders Textarea", () => {
		render(<Textarea name="body" label="Body" />)
		screen.getByLabelText("Body")
	})

	test("renders AutocompleteInput", () => {
		render(<AutocompleteInput name="city" data={ ["Austin"] } />)
	})

	test("renders ColorPickerInput", () => {
		render(<ColorPickerInput name="color" label="Color" value="#112233" />)
		screen.getByText("Color")
	})
})
