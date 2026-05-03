import { MantineProvider } from "@mantine/core"
import { render, screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { PasswordInput } from "@/components/Inputs"

describe("components/Inputs/PasswordInput", () => {
	test("forwards name to the underlying input", () => {
		render(
			<MantineProvider>
				<PasswordInput name="user.password" label="Password" />
			</MantineProvider>
		)

		const el = screen.getByLabelText("Password")
		expect(el).toHaveAttribute("name", "user.password")
	})
})

