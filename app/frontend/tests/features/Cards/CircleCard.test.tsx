import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { CircleCard } from "@/features/Cards"
import { createThemePersisted } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

function createCirclesIndex(overrides?: Partial<Schema.CirclesIndex>): Schema.CirclesIndex {
	const themes = overrides?.themes ?? [createThemePersisted()]

	return {
		id: "circle-1",
		name: "Circle 1",
		slug: "circle-1",
		themes,
		themes_count: themes.length,
		memberships_count: 3,
		...overrides,
	}
}

describe("features/Cards/CircleCard", () => {
	test("shows member count and total given placeholder", () => {
		render(<CircleCard circle={ createCirclesIndex() } />)

		screen.getByText("3 members")
		screen.getByText("Total given: --")
		expect(screen.queryByRole("button")).toBeNull()
	})
})
