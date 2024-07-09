import { StateCreator } from 'zustand'

export interface HeaderSlice {
	siteTitle: React.ReactNode
	setSiteTitle: (siteTitle: React.ReactNode) => void

	headerPinned: boolean
	setHeaderPinned: (pinned: boolean) => void
}

export const createHeaderSlice: StateCreator<HeaderSlice, [], [],HeaderSlice> = (set) => ({
	siteTitle: 'Giving Circle',
	setSiteTitle: siteTitle => set(() => ({ siteTitle })),

	headerPinned: true,
	setHeaderPinned: headerPinned => set(() => ({ headerPinned })),
})
