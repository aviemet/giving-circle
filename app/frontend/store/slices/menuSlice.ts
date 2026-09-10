import { StateCreator } from "zustand"

export const menuKeys = {
	circle: "circle",
	theme: "theme",
	presentation: "presentation",
} as const

export type MenuKey = keyof typeof menuKeys

export interface MenuSlice {
	menuKeys: typeof menuKeys
	openMenus: Set<MenuKey>
	toggleOpenMenu: (menu: MenuKey, open?: boolean) => void
	setOpenMenus: (menus: MenuKey[]) => void
}

const allMenuKeys: MenuKey[] = [menuKeys.circle, menuKeys.theme, menuKeys.presentation]

export const createMenuSlice: StateCreator<MenuSlice> =
	(set) => ({
		menuKeys: menuKeys,

		openMenus: new Set(allMenuKeys),

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
