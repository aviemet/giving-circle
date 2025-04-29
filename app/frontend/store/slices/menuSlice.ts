import { StateCreator } from "zustand"

const menuKeys = {
	circle: "circle",
	theme: "theme",
	presentation: "presentation",
} as const

export interface MenuSlice {
	menuKeys: typeof menuKeys
	openMenus: Set<string>
	toggleOpenMenu: (menu: keyof typeof menuKeys, open?: boolean) => void
	setOpenMenus: (menus: (keyof typeof menuKeys)[]) => void
}

export const createMenuSlice: StateCreator<MenuSlice> =
(set) => ({
	menuKeys: menuKeys,

	openMenus: new Set(Object.keys(menuKeys)),

	toggleOpenMenu: (menu, open) => set(state => {
		const newOpenMenus = new Set(state.openMenus)

		const shouldAdd = open === undefined ? !newOpenMenus.has(menu) : open
		if(shouldAdd) {
			newOpenMenus.add(menu)
		} else {
			newOpenMenus.delete(menu)
		}

		return {
			openMenus: newOpenMenus,
		}
	}),

	setOpenMenus: (menus) => set(() => ({
		openMenus: new Set(menus),
	})),
})
