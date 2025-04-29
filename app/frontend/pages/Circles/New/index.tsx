import React from 'react'
import { Title, Page, Section } from '@/components'
import { Routes } from '@/lib'
import CircleForm from '../Form'

interface NewCircleProps {
	circle: Schema.CirclesFormData
}

// @path: /circles/new
// @route: newCircle
const NewCircle = (data: NewCircleProps) => {
	const title = 'New Circle'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Circles', href: Routes.circles() },
			{ title: 'New Circle', href: Routes.newCircle() },
		] }>

			<Section>
				<Title>{ title }</Title>

				<CircleForm
					to={ Routes.circles() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewCircle
