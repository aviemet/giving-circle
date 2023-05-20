import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import CirclesTable from '../Table'

interface ICircleIndexProps {
	circles: Schema.CirclesIndex[]
	pagination: Schema.Pagination
}

const CirclesIndex = ({ circles, pagination }: ICircleIndexProps) => {
	return (
		<IndexPageTemplate
			title="Circles"
			model="circles"
			rows={ circles }
			pagination={ pagination }
			deleteRoute={ Routes.circles() }
			menuOptions={ [
				{ label: 'New Circle', href: Routes.newCircle(), icon: NewIcon },
			] }
		>
			<CirclesTable />
		</IndexPageTemplate>
	)
}

export default CirclesIndex
