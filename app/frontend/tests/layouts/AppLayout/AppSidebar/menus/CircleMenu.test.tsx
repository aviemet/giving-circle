import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, test } from "vitest"

import { Accordion } from "@/components"
import { CircleMenu } from "@/layouts/AppLayout/AppSidebar/menus/CircleMenu"
import { Routes } from "@/lib"
import { createCircleInertiaShare } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("layouts/AppLayout/AppSidebar/menus/CircleMenu", () => {
	test("returns null without circle", () => {
		const { container } = render(
			<Accordion>
				<CircleMenu />
			</Accordion>,
		)
		expect(container.querySelector(".mantine-Accordion-item")).toBeNull()
	})

	test("renders circle nav links", async () => {
		const user = userEvent.setup()
		const circle = createCircleInertiaShare()

		render(
			<Accordion multiple>
				<CircleMenu circle={ circle } />
			</Accordion>,
		)

		await user.click(screen.getByRole("button", { name: circle.name }))

		await waitFor(() => {
			expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
				"href",
				Routes.circle(circle.slug),
			)
			expect(screen.getByRole("link", { name: "Members" })).toHaveAttribute(
				"href",
				Routes.circleMemberships(circle.slug),
			)
		})
	})
})
