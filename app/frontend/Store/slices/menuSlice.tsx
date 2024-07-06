import React from 'react'
import { StateCreator } from 'zustand'
import { DefaultMenu } from '@/Layouts/AppLayout/AppSidebar/menus'

export interface MenuSlice {
	NavMenu: React.JSX.Element
	setNavMenu: (menu: React.JSX.Element) => void
}

export const createMenuSlice: StateCreator<MenuSlice> =
(set) => ({
	NavMenu: <DefaultMenu />,

	setNavMenu: menu => set(() => ({
		NavMenu: menu,
	})),
})
