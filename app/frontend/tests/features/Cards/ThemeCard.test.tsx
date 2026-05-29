import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { ThemeCard } from "@/features/Cards"
import { createThemePersisted } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("features/Cards/ThemeCard", () => {
	test("shows status badge and optional meta line", () => {
		const theme = createThemePersisted({ status: "current" })

		render(<ThemeCard theme={ theme } metaLine="My Circle" />)

		screen.getByText(theme.name)
		screen.getByText("My Circle")
		screen.getByText("Current")
		expect(screen.queryByRole("button")).toBeNull()
	})

	test("omits meta line when not provided", () => {
		const theme = createThemePersisted({ status: "current" })

		render(<ThemeCard theme={ theme } />)

		screen.getByText(theme.name)
		expect(screen.queryByText("My Circle")).toBeNull()
	})
})
