import { waitFor } from "@testing-library/react"
import { afterEach, describe, expect, test } from "vitest"

import { AppSidebarMenu } from "@/layouts/AppLayout/AppSidebar/Menu"
import { useLayoutStore } from "@/store"
import { type MenuKey } from "@/store/slices/menuSlice"
import { createCircleInertiaShare, createThemeInertiaShare } from "@/tests/helpers/fixtures"
import { inertiaPageProps } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("layouts/AppLayout/AppSidebar/Menu", () => {
	afterEach(() => {
		inertiaPageProps.active_circle = undefined
		inertiaPageProps.active_theme = undefined
		inertiaPageProps.active_presentation = undefined
		const allMenus: MenuKey[] = ["circle", "theme", "presentation"]
		useLayoutStore.getState().setOpenMenus(allMenus)
	})

	test("accordion uses separated variant for grouped nav", async() => {
		inertiaPageProps.active_circle = createCircleInertiaShare()

		const { container } = render(<AppSidebarMenu />)

		await waitFor(() => {
			const accordionRoot = container.querySelector("[data-accordion]")
			expect(accordionRoot).toHaveAttribute("data-variant", "separated")
		})
	})

	test("does not close other menus when deeper menu appears", async() => {
		useLayoutStore.getState().setOpenMenus(["circle"] satisfies MenuKey[])

		inertiaPageProps.active_circle = createCircleInertiaShare()
		inertiaPageProps.active_theme = createThemeInertiaShare()

		render(<AppSidebarMenu />)

		await waitFor(() => {
			const openMenus = useLayoutStore.getState().openMenus
			expect(openMenus.has("circle")).toBe(true)
			expect(openMenus.has("theme")).toBe(true)
		})
	})
})
