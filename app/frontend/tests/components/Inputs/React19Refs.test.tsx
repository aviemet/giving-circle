import { MantineProvider } from "@mantine/core"
import { render, waitFor } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { ColorInput, FileInput, Radio } from "@/components/Inputs"

describe("components/Inputs React 19 refs", () => {
	test("ColorInput accepts ref as a prop", async () => {
		const inputRef = React.createRef<HTMLInputElement>()

		render(
			<MantineProvider>
				<ColorInput name="color" ref={ inputRef } />
			</MantineProvider>
		)

		await waitFor(() => {
			expect(inputRef.current).not.toBeNull()
		})
	})

	test("FileInput accepts ref as a prop", async () => {
		const buttonRef = React.createRef<HTMLButtonElement>()

		render(
			<MantineProvider>
				<FileInput name="file" ref={ buttonRef } />
			</MantineProvider>
		)

		await waitFor(() => {
			expect(buttonRef.current).not.toBeNull()
		})
	})

	test("Radio accepts ref as a prop", async () => {
		const radioRef = React.createRef<HTMLInputElement>()

		render(
			<MantineProvider>
				<Radio value="a" name="radio" ref={ radioRef } />
			</MantineProvider>
		)

		await waitFor(() => {
			expect(radioRef.current).not.toBeNull()
		})
	})
})

