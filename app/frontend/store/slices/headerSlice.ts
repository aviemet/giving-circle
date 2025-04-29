import { StateCreator } from 'zustand'

const DEFAULT_SITE_TITLE = 'Giving Circle'

export interface HeaderSlice {
	defaultSiteTitle: string
	siteTitle: React.ReactNode
	setSiteTitle: (siteTitle: React.ReactNode) => void

	headerPinned: boolean
	setHeaderPinned: (pinned: boolean) => void
}

export const createHeaderSlice: StateCreator<HeaderSlice, [], [],HeaderSlice> = (set) => ({
	defaultSiteTitle: DEFAULT_SITE_TITLE,
	siteTitle: DEFAULT_SITE_TITLE,
	setSiteTitle: siteTitle => set(() => ({ siteTitle })),

	headerPinned: true,
	setHeaderPinned: headerPinned => set(() => ({ headerPinned })),
})
