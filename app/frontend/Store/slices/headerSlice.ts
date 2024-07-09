import { StateCreator } from 'zustand'

export interface HeaderSlice {
	siteTitle: React.ReactNode
	setSiteTitle: (siteTitle: React.ReactNode) => void
}

export const createHeaderSlice: StateCreator<HeaderSlice, [], [],HeaderSlice> = (set) => ({
	siteTitle: 'Giving Circle',
	setSiteTitle: siteTitle => set(state => ({ siteTitle })),
})
