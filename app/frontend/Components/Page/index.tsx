import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Head } from '@inertiajs/react'
import { DefaultMenu } from '@/Layouts/AppLayout/AppSidebar/menus'
import Breadcrumbs, { type Breadcrumb } from '@/Components/Breadcrumbs'
import { Portal } from '@/Components'
import useLayoutStore from '@/lib/store/LayoutStore'

export interface PageProps {
	children?: React.ReactNode
	title?: string
	meta?: React.ReactNode
	breadcrumbs?: Breadcrumb[]
	hideNavMenu?: boolean
	navMenu?: (props: any) => React.JSX.Element
}

const Page = ({
	children,
	title,
	meta,
	hideNavMenu = false,
	navMenu: NavMenu,
	breadcrumbs,
}: PageProps) => {
	const { sidebarVisible, setSidebarVisible } = useLayoutStore()

	const dynamicNavMenuRef = useRef(document.getElementById('dynamic-nav-menu'))

	useLayoutEffect(() => {
		if(dynamicNavMenuRef.current) return

		dynamicNavMenuRef.current = document.getElementById('dynamic-nav-menu')
	}, [])

	useEffect(() =>{
		if(sidebarVisible === !hideNavMenu) return

		setSidebarVisible(!hideNavMenu)
	}, [hideNavMenu])

	return (
		<>
			{ title && <Head title={ title }>
				{ meta && meta }
			</Head> }

			{ dynamicNavMenuRef.current && <Portal target={ dynamicNavMenuRef.current }>
				{ NavMenu ? <NavMenu /> : <DefaultMenu /> }
			</Portal> }

			{ breadcrumbs && <Breadcrumbs crumbs={ breadcrumbs } /> }

			{ children }
		</>
	)
}

export default Page
