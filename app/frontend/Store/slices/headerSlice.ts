import { StateCreator } from 'zustand'

export interface HeaderSlice {
	siteTitle: string
	setSiteTitle: (siteTitle: string) => void
}

export const createHeaderSlice: StateCreator<HeaderSlice, [], [],HeaderSlice> = (set) => ({
	siteTitle: 'Giving Circle',
	setSiteTitle: siteTitle => set(state => ({ siteTitle })),
})
