import { StateCreator } from "zustand"

export interface ContentSlice {
	mainPaddingDisabled: boolean
	setMainPaddingDisabled: (disabled: boolean) => void
}

export const createContentSlice: StateCreator<ContentSlice, [], [], ContentSlice> = (set) => ({
	mainPaddingDisabled: false,
	setMainPaddingDisabled: disabled => set(() => ({ mainPaddingDisabled: disabled })),
})
