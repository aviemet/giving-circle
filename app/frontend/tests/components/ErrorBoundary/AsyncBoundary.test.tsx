import { screen } from "@testing-library/react"
import React from "react"

import { AsyncBoundary } from "@/components/ErrorBoundary/AsyncBoundary"
import { render } from "@/tests/helpers/utils"

describe("AsyncBoundary", () => {
	it("renders children when minimumLoadingTime is 0", async() => {
		vi.useFakeTimers()
		render(
			<AsyncBoundary minimumLoadingTime={ 0 }>
				<span>child</span>
			</AsyncBoundary>,
		)
		expect(screen.getByText("child")).toBeInTheDocument()
		await vi.runAllTimersAsync()
		expect(screen.getByText("child")).toBeInTheDocument()
		vi.useRealTimers()
	})
})
