import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, test } from "vitest"

import { IconSegmented } from "@/components/VisualEditor/fields/shared"
import { render } from "@/tests/helpers/utils"

const displayOptions = [
	{ value: "block", label: "Block" },
	{ value: "flex", label: "Flex" },
]

function DualDisplayControls() {
	const [firstValue, setFirstValue] = useState("flex")
	const [secondValue, setSecondValue] = useState("flex")

	return (
		<>
			<IconSegmented
				name="flex.display"
				value={ firstValue }
				options={ displayOptions }
				onChange={ setFirstValue }
			/>
			<IconSegmented
				name="flex.display"
				value={ secondValue }
				options={ displayOptions }
				onChange={ setSecondValue }
			/>
		</>
	)
}

describe("components/VisualEditor/fields/shared/IconSegmented", () => {
	test("updates the selected segment when clicked", async () => {
		const user = userEvent.setup()
		function Control() {
			const [value, setValue] = useState("flex")
			return (
				<IconSegmented
					name="flex.display"
					value={ value }
					options={ displayOptions }
					onChange={ setValue }
				/>
			)
		}

		render(<Control />)

		expect(screen.getByRole("radio", { name: "Flex" })).toBeChecked()
		await user.click(screen.getByText("Block"))
		expect(screen.getByRole("radio", { name: "Block" })).toBeChecked()
		expect(screen.getByRole("radio", { name: "Flex" })).not.toBeChecked()
	})

	test("does not share radio names when two controls use the same field path", async () => {
		const user = userEvent.setup()
		render(<DualDisplayControls />)

		const blockRadios = screen.getAllByRole("radio", { name: "Block" })
		const flexRadios = screen.getAllByRole("radio", { name: "Flex" })
		const firstBlock = blockRadios[0]
		const secondBlock = blockRadios[1]
		const firstFlex = flexRadios[0]
		const secondFlex = flexRadios[1]

		if(
			!(firstBlock instanceof HTMLInputElement)
			|| !(secondBlock instanceof HTMLInputElement)
			|| !(firstFlex instanceof HTMLInputElement)
			|| !(secondFlex instanceof HTMLInputElement)
		) {
			throw new Error("Expected radio inputs")
		}

		expect(firstBlock.name).not.toBe(secondBlock.name)
		expect(firstFlex).toBeChecked()
		expect(secondFlex).toBeChecked()

		const blockLabels = screen.getAllByText("Block")
		const secondBlockLabel = blockLabels[1]
		if(secondBlockLabel === undefined) {
			throw new Error("Expected a second Block label")
		}

		await user.click(secondBlockLabel)

		expect(firstFlex).toBeChecked()
		expect(firstBlock).not.toBeChecked()
		expect(secondBlock).toBeChecked()
		expect(secondFlex).not.toBeChecked()
	})
})
