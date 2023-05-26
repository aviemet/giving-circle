import React from 'react'
import { Head } from '@inertiajs/react'

interface IPageProps {
	children?: React.ReactNode
	title?: string
	meta?: React.ReactNode
}

const Page = ({ children, title, meta }: IPageProps) => {
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
