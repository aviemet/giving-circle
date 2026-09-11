import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import { PledgeOrgCard } from "@/components/VisualEditor/components/interaction/InteractionOrgMoneyMap/orgCards/PledgeOrgCard"
import { render } from "@/tests/helpers/utils"

describe("InteractionOrgMoneyMap/PledgeOrgCard", () => {
	test("toggles selection", async () => {
		const user = userEvent.setup()
		const onToggle = vi.fn()
		render(
			<PledgeOrgCard
				orgName="Org 1"
				selected={ false }
				fullyFunded={ false }
				onToggle={ onToggle }
			/>,
		)
		await user.click(screen.getByRole("button", { name: "Org 1" }))
		expect(onToggle).toHaveBeenCalled()
	})

	test("shows funded marker", () => {
		render(
			<PledgeOrgCard
				orgName="Org 2"
				selected
				fullyFunded
				onToggle={ () => undefined }
			/>,
		)
		screen.getByText("Org 2")
		screen.getByText("*")
	})
})
