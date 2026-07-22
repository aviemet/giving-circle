import { screen } from "@testing-library/react"
import { afterEach, describe, expect, test } from "vitest"

import { CircleDropdownLink } from "@/layouts/AppLayout/AppSidebar/CircleDropdownLink"
import { Routes } from "@/lib"
import { createCircleInertiaShare } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("layouts/AppLayout/AppSidebar/CircleDropdownLink", () => {
	afterEach(() => {
		inertiaPageProps.active_circle = undefined
		inertiaPageProps.circles = undefined
		inertiaPageProps.auth = {
			user: {
				id: "user-1",
				active: true,
				email: "user@example.com",
				slug: "user-1",
				circles: [],
			},
		}
	})

	test("links avatar and circle name to the active circle", () => {
		const circle = createCircleInertiaShare({ name: "Battery Powered", slug: "battery-powered" })
		inertiaPageProps.active_circle = circle
		inertiaPageProps.auth = {
			user: {
				id: "user-1",
				active: true,
				email: "user@example.com",
				slug: "user-1",
				circles: [{ id: circle.id, name: circle.name, slug: circle.slug }],
			},
		}

		render(<CircleDropdownLink />)

		const link = screen.getByRole("link", { name: /Battery Powered/ })
		expect(link).toHaveAttribute("href", Routes.circle("battery-powered"))
		expect(link).toHaveTextContent("BP")
		expect(link).toHaveTextContent("Battery Powered")
	})

	test("falls back to first shared circle when active_circle is missing", () => {
		const circle = createCircleInertiaShare({ name: "Battery Powered", slug: "battery-powered" })
		inertiaPageProps.circles = [circle]
		inertiaPageProps.auth = {
			user: {
				id: "user-1",
				active: true,
				email: "user@example.com",
				slug: "user-1",
				circles: [{ id: circle.id, name: circle.name, slug: circle.slug }],
			},
		}

		render(<CircleDropdownLink />)

		expect(screen.getByRole("link", { name: /Battery Powered/ })).toHaveAttribute(
			"href",
			Routes.circle("battery-powered"),
		)
	})

	test("links Giving Circles to the circles index when no circle is available", () => {
		render(<CircleDropdownLink />)

		expect(screen.getByRole("link", { name: "Giving Circles" })).toHaveAttribute(
			"href",
			Routes.circles(),
		)
	})
})
