import React, { useReducer } from 'react'
import { createContext } from '@/lib/hooks'

interface ILayoutSettings {
	sidebarOpen: boolean
}
interface ILayoutContext {
	layoutState: ILayoutSettings
	setLayoutState: Function
}

const [useLayout, LayoutContextProvider] = createContext<ILayoutContext>()
export { useLayout }

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
	const layoutReducer = (layoutState: ILayoutSettings, newlayoutState: Partial<ILayoutSettings>) => ({
		...layoutState,
		...newlayoutState,
	})

	const [layoutState, setLayoutState] = useReducer(layoutReducer, {
		sidebarOpen: false,
	})

	return (
		<LayoutContextProvider value={ { layoutState, setLayoutState } }>
			{ children }
		</LayoutContextProvider>
	)
}

export default LayoutProvider
