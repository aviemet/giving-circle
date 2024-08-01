import React, { useEffect } from 'react'
import { Head } from '@inertiajs/react'
import Breadcrumbs, { type Breadcrumb } from '@/Components/Breadcrumbs'
import useLayoutStore from '@/Store/LayoutStore'
import { useInit } from '@/lib/hooks'

export interface PageProps {
	children?: React.ReactNode
	title?: string
	siteTitle?: React.ReactNode
	meta?: React.ReactNode
	breadcrumbs?: Breadcrumb[]
	hideNavMenu?: boolean
	disablePadding?: boolean
}

const Page = ({
	children,
	title,
	siteTitle,
	meta,
	hideNavMenu = false,
	breadcrumbs,
	disablePadding,
}: PageProps) => {
	const {
		sidebarVisible,
		setSidebarVisible,
		defaultSiteTitle,
		setSiteTitle,
		setMainPaddingDisabled,
	} = useLayoutStore()

	useInit(() => {
		// Allow pages to disable padding on top level <main>
		setMainPaddingDisabled(disablePadding === true ? true : false)

		// Allow pages to set header title
		const usedTitle = siteTitle || title

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
		setSiteTitle(siteTitle || title)
	}, [siteTitle, title, setSiteTitle])

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
