import { describe, expect, test } from "vitest"
import { create } from "zustand"

import { appLayoutMachine } from "@/store/appLayoutMachine"
import { useLayoutStore } from "@/store/LayoutStore"
import { createColorSlice, type ColorSlice } from "@/store/slices/colorSlice"
import { createContentSlice, type ContentSlice } from "@/store/slices/contentSlice"
import { createSidebarSlice, type SidebarSlice } from "@/store/slices/sidebarSlice"
import { createTableSlice, type TableSlice } from "@/store/slices/tableSlice"

describe("store/slices/colorSlice", () => {
	test("sets primary color", () => {
		const useStore = create<ColorSlice>()((...args) => createColorSlice(...args))
		useStore.getState().setPrimaryColor("pink")
		expect(useStore.getState().primaryColor).toBe("pink")
	})
})

describe("store/slices/contentSlice", () => {
	test("toggles main padding", () => {
		const useStore = create<ContentSlice>()((...args) => createContentSlice(...args))
		useStore.getState().setMainPaddingDisabled(true)
		expect(useStore.getState().mainPaddingDisabled).toBe(true)
	})
})

describe("store/slices/sidebarSlice", () => {
	test("toggles and sets sidebar visibility", () => {
		const useStore = create<SidebarSlice>()((...args) => createSidebarSlice(...args))

		useStore.getState().toggleSidebarOpen()
		expect(useStore.getState().sidebarOpen).toBe(false)
		useStore.getState().toggleSidebarOpen(true)
		expect(useStore.getState().sidebarOpen).toBe(true)
		useStore.getState().setSidebarVisible(true)
		expect(useStore.getState().sidebarVisible).toBe(true)
	})
})

describe("store/slices/tableSlice", () => {
	test("exposes defaults", () => {
		const useStore = create<TableSlice>()((...args) => createTableSlice(...args))
		expect(useStore.getState().defaults.tableRecordsLimit).toBe(25)
	})
})

describe("store/LayoutStore", () => {
	test("composes slices", () => {
		useLayoutStore.getState().setSiteTitle("Title")
		useLayoutStore.getState().setPrimaryColor("blue")
		useLayoutStore.getState().setMainPaddingDisabled(false)
		expect(useLayoutStore.getState().siteTitle).toBe("Title")
		expect(useLayoutStore.getState().primaryColor).toBe("blue")
	})
})

describe("store/appLayoutMachine", () => {
	test("exports an xstate machine", () => {
		expect(appLayoutMachine.id).toBe("appLayout")
	})
})
