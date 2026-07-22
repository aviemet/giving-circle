import { screen, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, test } from "vitest"

import { AppSidebarMenu } from "@/layouts/AppLayout/AppSidebar/SidebarMenu"
import { Routes } from "@/lib"
import { useLayoutStore } from "@/store"
import { type MenuKey } from "@/store/slices/menuSlice"
import {
	createCircleInertiaShare,
	createPresentationInertiaShare,
	createThemeInertiaShare,
} from "@/tests/helpers/fixtures"
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

	test("accordion uses separated variant for grouped nav", async () => {
		inertiaPageProps.active_circle = createCircleInertiaShare()

		const { container } = render(<AppSidebarMenu />)

		await waitFor(() => {
			const accordionRoot = container.querySelector("[data-accordion]")
			expect(accordionRoot).toHaveAttribute("data-variant", "separated")
		})
	})

	test("does not close other menus when deeper menu appears", async () => {
		inertiaPageProps.active_circle = createCircleInertiaShare()

		const { rerender } = render(<AppSidebarMenu />)

		await waitFor(() => {
			expect(screen.getByRole("link", { name: "Members" })).toBeVisible()
		})

		inertiaPageProps.active_theme = createThemeInertiaShare()
		rerender(<AppSidebarMenu />)

		await waitFor(() => {
			expect(screen.getByRole("link", { name: "Members" })).toBeVisible()
			expect(screen.getByRole("link", { name: "Organizations" })).toBeVisible()
		})
	})

	test("renders presentation menu links", async () => {
		inertiaPageProps.active_circle = createCircleInertiaShare()
		inertiaPageProps.active_theme = createThemeInertiaShare()
		inertiaPageProps.active_presentation = createPresentationInertiaShare()

		render(<AppSidebarMenu />)

		await waitFor(() => {
			const presentationOverview = screen.getAllByRole("link", { name: "Overview" }).find(
				(link) => link.getAttribute("href") === Routes.themePresentation("circle-1", "theme-1", "presentation-1"),
			)
			expect(presentationOverview).toBeDefined()
			expect(screen.getByRole("link", { name: "Slides" })).toHaveAttribute(
				"href",
				Routes.themePresentationSlides("circle-1", "theme-1", "presentation-1"),
			)
			expect(screen.getByRole("link", { name: "Interactions" })).toHaveAttribute(
				"href",
				Routes.themePresentationInteractions("circle-1", "theme-1", "presentation-1"),
			)
			expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute(
				"href",
				Routes.themePresentationSettings("circle-1", "theme-1", "presentation-1"),
			)
		})
	})
})
