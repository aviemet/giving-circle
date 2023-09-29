import React from 'react'
import { Routes } from '@/lib'
import { NewIcon } from '@/Components/Icons'
import CirclesTable from '../Table'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'

interface ICircleIndexProps {
	circles: Schema.Circle[]
	pagination: Schema.Pagination
}

const CirclesIndex = ({ circles, pagination }: ICircleIndexProps) => {
	return (
		<IndexPageTemplate
			title="Circles"
			model="circle"
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
