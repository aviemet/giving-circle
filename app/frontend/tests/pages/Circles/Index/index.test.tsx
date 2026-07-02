import { screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import CirclesIndex from "@/pages/Circles/Index"
import { createCircleInertiaShare, createThemePersisted } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

function createCirclesIndex(overrides?: Partial<Schema.CirclesIndex>): Schema.CirclesIndex {
	const themes = overrides?.themes ?? [createThemePersisted()]

	return {
		...createCircleInertiaShare({ themes }),
		...overrides,
		themes,
		themes_count: themes.length,
		memberships_count: overrides?.memberships_count ?? 0,
	}
}

function createThemesDashboard(
	overrides?: Partial<Schema.ThemesDashboard>,
): Schema.ThemesDashboard {
	return createThemePersisted(overrides)
}

describe("pages/Circles/Index/index", () => {
	test("renders circles dashboard", () => {
		render(
			<CirclesIndex
				circles={ [createCirclesIndex()] }
				recent_themes={ [createThemesDashboard()] }
			/>,
		)

		expect(screen.getByTestId("inertia-head")).toHaveAttribute("data-title", "Dashboard")

		screen.getByText("Your Circles")
		screen.getByText("New circle")
		expect(screen.getAllByText("Circle 1").length).toBeGreaterThan(0)

		screen.getByText("Recent and Upcoming Themes")
		screen.getByText("Current")
		expect(screen.queryByText("Create a circle")).toBeNull()
	})

	test("renders create circle card when user has no circles", () => {
		render(
			<CirclesIndex
				circles={ [] }
				recent_themes={ [] }
			/>,
		)

		screen.getByText("Create a circle")
		expect(screen.queryByText("Recent and Upcoming Themes")).toBeNull()
	})
})
