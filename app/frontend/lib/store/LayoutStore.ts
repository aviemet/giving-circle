import { create } from 'zustand'
import { type IColorSlice, type IMenuSlice, type ISidebarSlice } from './slices'
import { createColorSlice } from './slices/colorSlice'
import { createMenuSlice } from './slices/menuSlice'
import { createSidebarSlice } from './slices/sidebarSlice'

type LayoutStoreSlices = IColorSlice & IMenuSlice & ISidebarSlice

const useLayoutStore = create<LayoutStoreSlices>()((...a) => ({
	...createColorSlice(...a),
	...createMenuSlice(...a),
	...createSidebarSlice(...a),
}))

export default useLayoutStore
