import { Head } from "@inertiajs/react"
import React, { useEffect } from "react"

import { Breadcrumbs, type Breadcrumb } from "@/components/Breadcrumbs"
import { useInit } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

export interface PageProps {
	children?: React.ReactNode
	/** Browser tab title via Inertia Head. Omitted leaves the tab unchanged on client navigations. */
	title?: string
	/**
	 * App shell header content (`AppHeader` / `siteTitle`).
	 * Omitted: falls back to `title`, then the app default.
	 * `null`: no shell heading (tab may still use `title`).
	 */
	heading?: string | React.ReactNode | null
	meta?: React.ReactNode
	breadcrumbs?: Breadcrumb[]
	hideNavMenu?: boolean
	disablePadding?: boolean
}

const Page = ({
	children,
	title,
	heading,
	meta,
	hideNavMenu = false,
	breadcrumbs,
	disablePadding,
}: PageProps) => {
	const sidebarVisible = useLayoutStore((state) => state.sidebarVisible)
	const setSidebarVisible = useLayoutStore((state) => state.setSidebarVisible)
	const defaultSiteTitle = useLayoutStore((state) => state.defaultSiteTitle)
	const setSiteTitle = useLayoutStore((state) => state.setSiteTitle)
	const setMainPaddingDisabled = useLayoutStore((state) => state.setMainPaddingDisabled)

	let appShellHeading: React.ReactNode
	switch(heading) {
		case null:
			appShellHeading = null
			break
		case undefined:
			appShellHeading = title ?? defaultSiteTitle
			break
		default:
			appShellHeading = heading
			break
	}

	useInit(() => {
		setMainPaddingDisabled(disablePadding === true)

		if(sidebarVisible === hideNavMenu) {
			setSidebarVisible(!hideNavMenu)
		}
	})

	useEffect(() => {
		setSiteTitle(appShellHeading)

		return () => {
			setSiteTitle(defaultSiteTitle)
		}
	}, [appShellHeading, setSiteTitle, defaultSiteTitle])

	return (
		<>
			{ title !== undefined && (
				<Head title={ title }>
					{ meta && meta }
				</Head>
			) }

			{ breadcrumbs && <Breadcrumbs crumbs={ breadcrumbs } /> }

			{ children }
		</>
	)
}

export { Page }
