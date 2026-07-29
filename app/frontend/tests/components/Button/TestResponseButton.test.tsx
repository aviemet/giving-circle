import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios from "axios"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import { TestResponseButton } from "@/components/Button/TestResponseButton"
import { render } from "@/tests/helpers/utils"

vi.mock("axios", () => ({
	default: {
		request: vi.fn(),
	},
}))

describe("components/Button/TestResponseButton", () => {
	test("renders and requests endpoint on click", async () => {
		const user = userEvent.setup()
		vi.mocked(axios.request).mockResolvedValue({ data: { success: true } })

		render(<TestResponseButton endpoint="/api/test" />)

		await user.click(screen.getByRole("button", { name: "Test" }))
		expect(axios.request).toHaveBeenCalled()
	})
})
