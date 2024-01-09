import React, { useEffect } from 'react'
import { Head } from '@inertiajs/react'
import { DefaultMenu, getDefaultMenu } from '@/Layouts/AppLayout/AppSidebar/menus'
import useLayoutStore from '@/lib/store/LayoutStore'
import { Portal } from '@mantine/core'

interface IPageProps {
	children?: React.ReactNode
	title?: string
	meta?: React.ReactNode
	navMenu?: React.JSX.Element
}

const defaultMenu = getDefaultMenu()

const Page = ({ children, title, meta, navMenu: NavMenu = defaultMenu }: IPageProps) => {
	const dynamicNavMenu = document.getElementById('dynamic-nav-menu')

	return (
		<>
			{ title && <Head title={ title }>
				{ meta && meta }
			</Head> }
			{ dynamicNavMenu && <Portal target={ dynamicNavMenu }>
				{ NavMenu && <NavMenu /> }
			</Portal> }
			{ children }
		</>
	)
}

export default Page
