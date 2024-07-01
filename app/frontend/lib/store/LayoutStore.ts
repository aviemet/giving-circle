import { create } from 'zustand'
import {
	type ColorSlice,
	type MenuSlice,
	type SidebarSlice,
	type TableSlice,
} from './slices'
import { createColorSlice } from './slices/colorSlice'
import { createMenuSlice } from './slices/menuSlice'
import { createSidebarSlice } from './slices/sidebarSlice'
import { createTableSlice } from './slices/tableSlice'

type LayoutStoreSlices = ColorSlice & SidebarSlice & TableSlice //& MenuSlice

const useLayoutStore = create<LayoutStoreSlices>()((...a) => ({
	...createColorSlice(...a),
	...createSidebarSlice(...a),
	// ...createMenuSlice(...a),
	...createTableSlice(...a),
}))

export default useLayoutStore
