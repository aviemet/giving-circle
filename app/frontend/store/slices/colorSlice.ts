import { StateCreator } from "zustand"

import { defaultColor } from "@/lib/theme"

export interface ColorSlice {
	primaryColor: string
	setPrimaryColor: (color: string) => void
}

export const createColorSlice: StateCreator<ColorSlice> =
(set) => ({
	primaryColor: defaultColor,

	setPrimaryColor: color => set(() => ({
		primaryColor: color,
	})),

})
