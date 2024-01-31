import React from 'react'
import { Head } from '@inertiajs/react'
import { DefaultMenu } from '@/Layouts/AppLayout/AppSidebar/menus'
import { Portal } from '@mantine/core'

interface IPageProps {
	children?: React.ReactNode
	title?: string
	meta?: React.ReactNode
	navMenu?: (props: any) => React.JSX.Element
}

const Page = ({ children, title, meta, navMenu: NavMenu }: IPageProps) => {
	const dynamicNavMenuEl = document.getElementById('dynamic-nav-menu')

	return (
		<>
			{ title && <Head title={ title }>
				{ meta && meta }
			</Head> }
			{ dynamicNavMenuEl && <Portal target={ dynamicNavMenuEl }>
				{ NavMenu ? <NavMenu /> : <DefaultMenu /> }
			</Portal> }
			{ children }
		</>
	)
}

export default Page
