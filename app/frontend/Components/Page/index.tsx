import React, { useEffect } from 'react'
import { Head } from '@inertiajs/react'
import { DefaultMenu } from '@/Layouts/AppLayout/AppSidebar/menus'
import useLayoutStore from '@/lib/store/LayoutStore'

interface IPageProps {
	children?: React.ReactNode
	title?: string
	meta?: React.ReactNode
	navMenu?:  React.JSX.Element
}

const Page = ({ children, title, meta, navMenu = <DefaultMenu /> }: IPageProps) => {
	const { NavMenu, setNavMenu } = useLayoutStore()

	useEffect(() => {
		if(navMenu === NavMenu ) return

		setNavMenu(navMenu)
	}, [navMenu])

	return (
		<>
			{ title && <Head title={ title }>
				{ meta && meta }
			</Head> }
			{ children }
		</>
	)
}

export default Page
