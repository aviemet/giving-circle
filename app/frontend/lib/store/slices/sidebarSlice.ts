import { StateCreator } from 'zustand'

export interface SidebarSlice {
	sidebarOpen: boolean
	sidebarVisible: boolean
	sidebarBreakpoint: string
	toggleSidebarOpen: (sidebarOpen?: boolean) => void
	setSidebarVisible: (visible: boolean) => void
}

export const createSidebarSlice: StateCreator<SidebarSlice> =
(set) => ({
	sidebarOpen: true,
	sidebarVisible: false,
	sidebarBreakpoint: 'sm',

	toggleSidebarOpen: sidebarOpen => set(state => {
		let setValue = sidebarOpen
		if(sidebarOpen === undefined) {
			setValue = !state.sidebarOpen
		}
		return { sidebarOpen: setValue }
	}),

	setSidebarVisible: visible => set(() => ({
		sidebarVisible: visible,
	})),
})
