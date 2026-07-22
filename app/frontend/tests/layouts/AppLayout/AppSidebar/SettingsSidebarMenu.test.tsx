import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, test } from "vitest"

import { SettingsSidebarMenu } from "@/layouts/AppLayout/AppSidebar/SidebarMenu"
import { createCircleInertiaShare, createRole } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("layouts/AppLayout/AppSidebar/SettingsSidebarMenu", () => {
	afterEach(() => {
		inertiaPageProps.circles = undefined
		inertiaPageProps.auth = {
			user: {
				id: "user-1",
				active: true,
				email: "user@example.com",
				slug: "user-1",
			},
		}
	})

	test("renders settings accordion with general link and circle settings for admins", async () => {
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

		const settingsHeading = screen.getByRole("button", { name: "Settings" })
		const circleHeading = screen.getByRole("button", { name: "Circle 1" })
		expect(settingsHeading.querySelector(".mantine-Accordion-icon")).toBeInTheDocument()
		expect(circleHeading.querySelector(".mantine-Accordion-icon")).toBeInTheDocument()

		await user.click(settingsHeading)
		screen.getByRole("link", { name: "General", hidden: true })

		screen.getByRole("link", { name: "Branding", hidden: true })
		screen.getByRole("link", { name: "Mail", hidden: true })
	})
})
