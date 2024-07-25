import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Head } from '@inertiajs/react'
import Breadcrumbs, { type Breadcrumb } from '@/Components/Breadcrumbs'
import useLayoutStore from '@/Store/LayoutStore'

export interface PageProps {
	children?: React.ReactNode
	title?: string
	siteTitle?: React.ReactNode
	meta?: React.ReactNode
	breadcrumbs?: Breadcrumb[]
	hideNavMenu?: boolean
}

const Page = ({
	children,
	title,
	siteTitle,
	meta,
	hideNavMenu = false,
	breadcrumbs,
}: PageProps) => {
	const { sidebarVisible, setSidebarVisible, siteTitle: storeSiteTitle, setSiteTitle } = useLayoutStore()

	// Maintain ref to inner nav menu for page specific menus
	const dynamicNavMenuRef = useRef(document.getElementById('dynamic-nav-menu'))
	useLayoutEffect(() => {
		if(dynamicNavMenuRef.current) return

		dynamicNavMenuRef.current = document.getElementById('dynamic-nav-menu')
	}, [])

	// Allow pages to control wether the sidebar is open
	useEffect(() =>{
		if(sidebarVisible === !hideNavMenu) return

		setSidebarVisible(!hideNavMenu)
	}, [hideNavMenu])

	// Allow pages to set the header title
	useEffect(() => {
		const usedSiteTitle = siteTitle ?? title

		if(!usedSiteTitle || usedSiteTitle === storeSiteTitle) return

		setSiteTitle(usedSiteTitle)
	}, [siteTitle, title])

	return (
		<>
			{ title && <Head title={ title }>
				{ meta && meta }
			</Head> }

			{ breadcrumbs && <Breadcrumbs crumbs={ breadcrumbs } /> }

			{ children }
		</>
	)
}

export default Page
