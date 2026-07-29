import { create } from "zustand"
import { describe, expect, test } from "vitest"

import { createHeaderSlice, type HeaderSlice } from "@/store/slices/headerSlice"
import { createMenuSlice, type MenuSlice } from "@/store/slices/menuSlice"

describe("store/slices/headerSlice", () => {
	test("sets site title and header pin state", () => {
		const useStore = create<HeaderSlice>()((...args) => createHeaderSlice(...args))

		useStore.getState().setSiteTitle("Hello")
		expect(useStore.getState().siteTitle).toBe("Hello")

		useStore.getState().setHeaderPinned(false)
		expect(useStore.getState().headerPinned).toBe(false)
		useStore.getState().setHeaderPinned(false)
		expect(useStore.getState().headerPinned).toBe(false)
	})
})

describe("store/slices/menuSlice", () => {
	test("toggles and sets open menus", () => {
		const useStore = create<MenuSlice>()((...args) => createMenuSlice(...args))

		useStore.getState().setOpenMenus(["circle"])
		expect(useStore.getState().openMenus.has("circle")).toBe(true)
		expect(useStore.getState().openMenus.has("theme")).toBe(false)

		useStore.getState().toggleOpenMenu("theme", true)
		expect(useStore.getState().openMenus.has("theme")).toBe(true)

		useStore.getState().toggleOpenMenu("theme")
		expect(useStore.getState().openMenus.has("theme")).toBe(false)

		useStore.getState().toggleOpenMenu("circle", false)
		expect(useStore.getState().openMenus.has("circle")).toBe(false)
	})
})
