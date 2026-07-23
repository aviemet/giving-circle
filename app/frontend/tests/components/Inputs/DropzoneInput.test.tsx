import { MantineProvider } from "@mantine/core"
import { render, waitFor } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { DropzoneInput } from "@/components/Inputs"
import { type DropzoneInputHandle } from "@/components/Inputs/DropzoneInput"

describe("components/Inputs/DropzoneInput", () => {
	test("accepts ref as a prop (React 19) and exposes imperative handle", async () => {
		const dropzoneRef = React.createRef<DropzoneInputHandle>()

		render(
			<MantineProvider>
				<DropzoneInput name="upload" ref={ dropzoneRef } />
			</MantineProvider>
		)

		await waitFor(() => {
			expect(dropzoneRef.current).not.toBeNull()
			expect(typeof dropzoneRef.current?.upload).toBe("function")
		})
	})

	test("renders a custom prompt instead of the default image copy", () => {
		const { getByText, queryByText } = render(
			<MantineProvider>
				<DropzoneInput name="font-upload" prompt="Drag font file here or click to select" />
			</MantineProvider>
		)

		expect(getByText("Drag font file here or click to select")).toBeInTheDocument()
		expect(queryByText("Drag image here or click to select files")).not.toBeInTheDocument()
	})
})

