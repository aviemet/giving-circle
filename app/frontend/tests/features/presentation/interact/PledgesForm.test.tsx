import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React, { type ReactNode } from "react"
import { describe, expect, test, vi } from "vitest"

import { PledgesForm } from "@/features/presentation/interact/pledges/PledgesForm"
import {
	createCirclePersisted,
	createPresentationOrgPersisted,
	createPresentationPresentation,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

vi.mock("@/features/presentation/PresentationDataProvider", () => {
	const circle = {
		id: "circle-1",
		name: "Circle",
		slug: "circle-1",
	}
	const presentation = {
		id: "presentation-1",
		active: true,
		name: "Presentation",
		slug: "presentation-1",
		theme_id: "theme-1",
		orgs: [],
	}

	return {
		PresentationDataProvider: ({ children }: { children: ReactNode }) => children,
		usePresentationDataContext: () => ({
			values: {
				allocated_totals: [],
				org_vote_totals: [],
				finalist_org_ids: ["org-1", "org-2"],
				money_totals: [],
				vote_counts: [],
				rank_totals: [],
			},
			isSubscribed: false,
			circle,
			presentation,
		}),
	}
})

describe("features/presentation/interact/pledges/PledgesForm", () => {
	const circle = createCirclePersisted({ id: "circle-1", slug: "circle-1" })
	const presentation = createPresentationPresentation({
		id: "presentation-1",
		slug: "presentation-1",
	})
	const orgs = [
		createPresentationOrgPersisted({ id: "org-1", name: "Org One", slug: "org-one" }),
		createPresentationOrgPersisted({ id: "org-2", name: "Org Two", slug: "org-two" }),
	]

	test("defaults to single-org selection until multi-org is enabled", async () => {
		const user = userEvent.setup()

		render(
			<PledgesForm
				circleSlug="circle-1"
				presentationSlug="presentation-1"
				circle={ circle }
				presentation={ presentation }
				interactionName="Pledges"
				context={ {
					presentation_orgs: orgs,
					finalist_org_ids: ["org-1", "org-2"],
					settings: {},
				} }
			/>,
		)

		const orgOne = screen.getByRole("button", { name: /org one/i })
		const orgTwo = screen.getByRole("button", { name: /org two/i })

		await user.click(orgOne)
		expect(orgOne).toHaveAttribute("aria-pressed", "true")

		await user.click(orgTwo)
		expect(orgOne).toHaveAttribute("aria-pressed", "false")
		expect(orgTwo).toHaveAttribute("aria-pressed", "true")

		await user.click(screen.getByLabelText(/select multiple organizations/i))
		await user.click(orgOne)

		expect(orgOne).toHaveAttribute("aria-pressed", "true")
		expect(orgTwo).toHaveAttribute("aria-pressed", "true")
	})
})
