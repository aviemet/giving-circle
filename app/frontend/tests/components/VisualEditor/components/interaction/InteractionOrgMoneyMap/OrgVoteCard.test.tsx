import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test, vi } from "vitest"

import { OrgVoteCard } from "@/components/VisualEditor/components/interaction/InteractionOrgMoneyMap/orgCards/OrgVoteCard"
import { render } from "@/tests/helpers/utils"

describe("InteractionOrgMoneyMap/OrgVoteCard", () => {
	test("toggles between slider and keyboard entry", async () => {
		const user = userEvent.setup()
		const onChange = vi.fn()

		render(
			<OrgVoteCard
				orgName="Org One"
				votes={ 2 }
				maxVotes={ 10 }
				onChange={ onChange }
			/>,
		)

		expect(screen.getByText("Org One")).toBeTruthy()
		expect(screen.getByText("2")).toBeTruthy()
		expect(screen.getByRole("slider")).toBeTruthy()

		await user.click(screen.getByRole("button", { name: /enter amount with keyboard/i }))

		expect(screen.getByRole("button", { name: /adjust amount with slider/i })).toHaveAttribute("aria-pressed", "true")
		expect(screen.queryByRole("slider")).toBeNull()
	})
})
