import { Head } from "@inertiajs/react"
import React, { useEffect } from "react"

import Breadcrumbs, { type Breadcrumb } from "@/components/Breadcrumbs"
import { useInit } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

export interface PageProps {
	children?: React.ReactNode
	title?: string
	heading?: string | React.ReactNode
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

	// Allow pages to set header title
	const usedTitle = heading || title

	useInit(() => {
		// Allow pages to disable padding on top level <main>
		setMainPaddingDisabled(disablePadding === true ? true : false)


		if(!usedTitle) {
			setSiteTitle(defaultSiteTitle)
		} else {
			setSiteTitle(usedTitle)
		}

		// Allow pages to control wether the sidebar is open
		if(sidebarVisible === hideNavMenu) {
			setSidebarVisible(!hideNavMenu)
		}
	})

	useEffect(() => {
		setSiteTitle(usedTitle)
	}, [setSiteTitle, usedTitle])

	return (
		<>
			{ title && (
				<Head title={ title }>
					{ meta && meta }
				</Head>
			) }

			{ breadcrumbs && <Breadcrumbs crumbs={ breadcrumbs } /> }

			{ children }
		</>
	)
}

export default Page
