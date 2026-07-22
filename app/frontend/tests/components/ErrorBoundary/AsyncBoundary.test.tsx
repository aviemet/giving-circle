import { act, screen } from "@testing-library/react"
import React from "react"

import { AsyncBoundary } from "@/components/ErrorBoundary/AsyncBoundary"
import { render } from "@/tests/helpers/utils"

describe("AsyncBoundary", () => {
	it("renders children when minimumLoadingTime is 0", async () => {
		render(
			<AsyncBoundary minimumLoadingTime={ 0 }>
				<span>child</span>
			</AsyncBoundary>,
		)

		await act(async () => {
			await new Promise<void>((resolve) => {
				setTimeout(resolve, 0)
			})
		})

		expect(screen.getByText("child")).toBeInTheDocument()
	})
})
