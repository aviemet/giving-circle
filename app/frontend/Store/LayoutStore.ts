import { create } from 'zustand'
import {
	type ColorSlice,
	type MenuSlice,
	type SidebarSlice,
	type TableSlice,
	type HeaderSlice,
} from './slices'
import { createColorSlice } from './slices/colorSlice'
import { createMenuSlice } from './slices/menuSlice'
import { createSidebarSlice } from './slices/sidebarSlice'
import { createTableSlice } from './slices/tableSlice'
import { createHeaderSlice } from './slices/headerSlice'

type LayoutStoreSlices = ColorSlice & SidebarSlice & TableSlice & HeaderSlice & MenuSlice

const useLayoutStore = create<LayoutStoreSlices>()((...a) => ({
	...createColorSlice(...a),
	...createSidebarSlice(...a),
	...createMenuSlice(...a),
	...createTableSlice(...a),
	...createHeaderSlice(...a),
}))

export default useLayoutStore
