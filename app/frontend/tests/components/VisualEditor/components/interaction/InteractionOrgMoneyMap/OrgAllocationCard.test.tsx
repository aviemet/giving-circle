import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import { OrgAllocationCard } from "@/components/VisualEditor/components/interaction/InteractionOrgMoneyMap/orgCards/OrgAllocationCard"
import { render } from "@/tests/helpers/utils"

describe("InteractionOrgMoneyMap/OrgAllocationCard", () => {
	test("toggles between slider and keyboard entry", async () => {
		const user = userEvent.setup()
		const onChange = vi.fn()

		render(
			<OrgAllocationCard
				orgName="Org One"
				amountCents={ 0 }
				maxCents={ 10_000 }
				currencyIso="USD"
				onChange={ onChange }
			/>,
		)

		expect(screen.getByText("Org One")).toBeTruthy()
		expect(screen.getByRole("slider")).toBeTruthy()

		await user.click(screen.getByRole("button", { name: /enter amount with keyboard/i }))

		expect(screen.getByRole("button", { name: /adjust amount with slider/i })).toHaveAttribute("aria-pressed", "true")
		expect(screen.getByLabelText("Org One")).toBeTruthy()
		expect(screen.queryByRole("slider")).toBeNull()
	})
})
