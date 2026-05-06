import { MantineProvider } from "@mantine/core"
import { render, waitFor } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { DropzoneInput } from "@/components/Inputs"
import { type DropzoneInputHandle } from "@/components/Inputs/DropzoneInput"

describe("components/Inputs/DropzoneInput", () => {
	test("accepts ref as a prop (React 19) and exposes imperative handle", async() => {
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
})

