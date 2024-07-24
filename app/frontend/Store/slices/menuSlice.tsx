import React from 'react'
import { StateCreator } from 'zustand'
import { DefaultMenu } from '@/Layouts/AppLayout/AppSidebar/menus'

export interface MenuSlice {
	// NavMenu: React.JSX.Element
	// setNavMenu: (menu: React.JSX.Element) => void

	openMenus: Set<string>
	toggleOpenMenu: (menu: string, open?: boolean) => void
}

export const createMenuSlice: StateCreator<MenuSlice> =
(set) => ({
	openMenus: new Set(),

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

	// NavMenu: <DefaultMenu />,

	// setNavMenu: menu => set(() => ({
	// 	NavMenu: menu,
	// })),
})
