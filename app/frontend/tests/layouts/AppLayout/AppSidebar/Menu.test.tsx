import { afterEach, describe, expect, test } from "vitest"

import { AppSidebarMenu } from "@/layouts/AppLayout/AppSidebar/Menu"
import { useLayoutStore } from "@/store"
import { createCircleInertiaShare } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("layouts/AppLayout/AppSidebar/Menu", () => {
	afterEach(() => {
		inertiaPageProps.active_circle = undefined
		inertiaPageProps.active_theme = undefined
		inertiaPageProps.active_presentation = undefined
		useLayoutStore.getState().setOpenMenus(["circle", "theme", "presentation"])
	})

	test("accordion uses separated variant for grouped nav", () => {
		inertiaPageProps.active_circle = createCircleInertiaShare()

		const { container } = render(<AppSidebarMenu />)
		const accordionRoot = container.querySelector("[data-accordion]")

		expect(accordionRoot).toBeTruthy()
		expect(accordionRoot).toHaveAttribute("data-variant", "separated")
	})
})
