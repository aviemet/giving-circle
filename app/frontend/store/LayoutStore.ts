import { create } from "zustand"

import {
	type ColorSlice,
	type MenuSlice,
	type SidebarSlice,
	type TableSlice,
	type HeaderSlice,
	type ContentSlice,
} from "./slices"
import { createColorSlice } from "./slices/colorSlice"
import { createContentSlice } from "./slices/contentSlice"
import { createHeaderSlice } from "./slices/headerSlice"
import { createMenuSlice } from "./slices/menuSlice"
import { createSidebarSlice } from "./slices/sidebarSlice"
import { createTableSlice } from "./slices/tableSlice"

type LayoutStoreSlices = ColorSlice & SidebarSlice & TableSlice & HeaderSlice & MenuSlice & ContentSlice

const useLayoutStore = create<LayoutStoreSlices>()((...a) => ({
	...createColorSlice(...a),
	...createSidebarSlice(...a),
	...createMenuSlice(...a),
	...createTableSlice(...a),
	...createHeaderSlice(...a),
	...createContentSlice(...a),
}))

export default useLayoutStore
