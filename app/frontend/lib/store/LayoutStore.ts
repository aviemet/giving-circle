import { create } from 'zustand'
import { defaultColor } from '../theme'

interface ILayoutState {
	sidebarOpen: boolean
	sidebarVisible: boolean
	primaryColor: string
	sidebarBreakpoint: string
	toggleSidebarOpen: (sidebarOpen?: boolean) => void
	setSidebarVisible: (visible: boolean) => void
	setPrimaryColor: (color: string) => void
}

const useLayoutStore = create<ILayoutState>()((set) => ({
	sidebarOpen: false,
	sidebarVisible: false,
	primaryColor: defaultColor,
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

	setPrimaryColor: color => set(() => ({
		primaryColor: color,
	})),
}))

export default useLayoutStore
