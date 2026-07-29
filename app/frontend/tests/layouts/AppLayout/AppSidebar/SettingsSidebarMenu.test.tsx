import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, test } from "vitest"

import { SettingsSidebarMenu } from "@/layouts/AppLayout/AppSidebar/SidebarMenu"
import { Routes } from "@/lib"
import { createCircleInertiaShare, createRole } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("layouts/AppLayout/AppSidebar/SettingsSidebarMenu", () => {
	afterEach(() => {
		inertiaPageProps.circles = undefined
		inertiaPageProps.active_circle = undefined
		inertiaPageProps.auth = {
			user: {
				id: "user-1",
				active: true,
				email: "user@example.com",
				slug: "user-1",
			},
		}
		window.history.replaceState({}, "", "/")
	})

	test("renders settings, circle, and templates accordion sections expanded by default", () => {
		const circle = createCircleInertiaShare()
		inertiaPageProps.circles = [circle]
		inertiaPageProps.auth = {
			user: {
				id: "user-1",
				active: true,
				email: "user@example.com",
				slug: "user-1",
				roles: [
					createRole({ name: "admin", resource_type: "Circle", resource_id: circle.id }),
				],
			},
		}

		render(<SettingsSidebarMenu />)

		const settingsHeading = screen.getByRole("button", { name: "Settings" })
		const circleHeading = screen.getByRole("button", { name: "Circle 1" })
		const templatesHeading = screen.getByRole("button", { name: "Templates" })
		expect(settingsHeading.querySelector(".mantine-Accordion-icon")).toBeInTheDocument()
		expect(circleHeading.querySelector(".mantine-Accordion-icon")).toBeInTheDocument()
		expect(templatesHeading.querySelector(".mantine-Accordion-icon")).toBeInTheDocument()

		expect(screen.getByRole("link", { name: "General" })).toBeVisible()
		expect(screen.getByRole("link", { name: "Branding" })).toBeVisible()
		expect(screen.getByRole("link", { name: "Mail" })).toBeVisible()
		expect(screen.getByRole("link", { name: "Presentation Templates" })).toBeVisible()
		expect(screen.getByRole("link", { name: "Interaction Templates" })).toBeVisible()
		expect(screen.getByRole("link", { name: "Presentation Templates" })).toHaveAttribute(
			"href",
			Routes.settingsTemplates(circle.slug),
		)
		expect(screen.getByRole("link", { name: "Interaction Templates" })).toHaveAttribute(
			"href",
			Routes.settingsInteractionTemplates(circle.slug),
		)
	})

	test("allows collapsing accordion sections", async () => {
		const user = userEvent.setup()
		const circle = createCircleInertiaShare()
		inertiaPageProps.circles = [circle]
		inertiaPageProps.auth = {
			user: {
				id: "user-1",
				active: true,
				email: "user@example.com",
				slug: "user-1",
				roles: [
					createRole({ name: "admin", resource_type: "Circle", resource_id: circle.id }),
				],
			},
		}

		render(<SettingsSidebarMenu />)

		expect(screen.getByRole("link", { name: "Branding" })).toBeVisible()
		expect(screen.getByRole("link", { name: "General" })).toBeVisible()

		await user.click(screen.getByRole("button", { name: "Circle 1" }))
		expect(screen.queryByRole("link", { name: "Branding" })).not.toBeInTheDocument()

		await user.click(screen.getByRole("button", { name: "Settings" }))
		expect(screen.queryByRole("link", { name: "General" })).not.toBeInTheDocument()
	})

	test("shows circle switcher when admin of multiple circles", async () => {
		const user = userEvent.setup()
		const circleOne = createCircleInertiaShare({ id: "circle-1", slug: "circle-1", name: "Circle 1" })
		const circleTwo = createCircleInertiaShare({ id: "circle-2", slug: "circle-2", name: "Circle 2" })
		inertiaPageProps.circles = [circleOne, circleTwo]
		inertiaPageProps.active_circle = circleOne
		inertiaPageProps.auth = {
			user: {
				id: "user-1",
				active: true,
				email: "user@example.com",
				slug: "user-1",
				roles: [
					createRole({ name: "admin", resource_type: "Circle", resource_id: circleOne.id }),
					createRole({ name: "admin", resource_type: "Circle", resource_id: circleTwo.id }),
				],
			},
		}
		window.history.replaceState({}, "", Routes.settingsBranding(circleOne.slug))

		render(<SettingsSidebarMenu />)

		expect(screen.queryByRole("button", { name: "Circle 2" })).not.toBeInTheDocument()
		await user.click(screen.getByRole("button", { name: "Switch circle" }))
		expect(await screen.findByRole("menuitem", { name: "Circle 2" })).toHaveAttribute(
			"href",
			Routes.settingsBranding(circleTwo.slug),
		)
	})
})
